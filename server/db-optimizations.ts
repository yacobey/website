import { Pool } from '@neondatabase/serverless';

// Database connection pool optimization
export function optimizePool(pool: Pool) {
  // Set optimal pool configuration for performance
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    // Connection pool settings for better performance
    max: 20, // Maximum number of connections
    min: 2,  // Minimum number of connections to maintain
    idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
    connectionTimeoutMillis: 10000, // Max time to wait for connection
  });
}

// Query optimization utilities
export const queryOptimizations = {
  // Batch multiple queries
  batchQueries: async (pool: Pool, queries: Array<{ text: string; values?: any[] }>) => {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const results = [];
      
      for (const query of queries) {
        const result = await client.query(query.text, query.values);
        results.push(result);
      }
      
      await client.query('COMMIT');
      return results;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Prepared statement for frequently used queries
  preparedStatements: {
    getUserById: 'SELECT * FROM users WHERE id = $1',
    getBlogPosts: 'SELECT * FROM blog_posts WHERE status = $1 ORDER BY published_at DESC LIMIT $2 OFFSET $3',
    getSeoData: 'SELECT * FROM seo_data WHERE page = $1',
    getContacts: 'SELECT * FROM contacts ORDER BY created_at DESC LIMIT $1',
  },

  // Index suggestions (would be applied via migrations)
  indexSuggestions: [
    'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blog_posts_status_published ON blog_posts(status, published_at) WHERE status = \'published\'',
    'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_seo_data_page ON seo_data(page)',
    'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_contacts_created_at ON contacts(created_at)',
    'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id)',
    'CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_users_email ON users(email) WHERE email IS NOT NULL',
  ],

  // Analyze query performance
  analyzeQuery: async (pool: Pool, query: string, values?: any[]) => {
    const explainQuery = `EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) ${query}`;
    const result = await pool.query(explainQuery, values);
    return result.rows[0]['QUERY PLAN'];
  }
};

// Memory optimization for large result sets
export function optimizeResultSet<T>(results: T[], pageSize = 50): {
  data: T[];
  hasMore: boolean;
  total: number;
} {
  return {
    data: results.slice(0, pageSize),
    hasMore: results.length > pageSize,
    total: results.length
  };
}

// Connection health check
export async function checkDatabaseHealth(pool: Pool): Promise<{
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  connections: {
    total: number;
    idle: number;
    active: number;
  };
}> {
  const start = Date.now();
  
  try {
    await pool.query('SELECT 1');
    const latency = Date.now() - start;
    
    // Get connection pool stats
    const stats = {
      total: pool.totalCount,
      idle: pool.idleCount,
      active: pool.totalCount - pool.idleCount
    };
    
    const status = latency < 100 ? 'healthy' : 
                   latency < 500 ? 'degraded' : 'unhealthy';
    
    return {
      status,
      latency,
      connections: stats
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      latency: Date.now() - start,
      connections: { total: 0, idle: 0, active: 0 }
    };
  }
}