// utils.js - Helper functions for export and data management

function exportChat(log = [], format = 'json') {
  if (format === 'json') {
    return exportAsJSON(log);
  } else if (format === 'markdown') {
    return exportAsMarkdown(log);
  } else if (format === 'csv') {
    return exportAsCSV(log);
  }
}

function exportAsJSON(log) {
  const data = {
    exportDate: new Date().toISOString(),
    source: 'Ford AI Notebook',
    messageCount: log.length,
    messages: log
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadBlob(blob, `codex_chat_${getTimestamp()}.json`);
}

function exportAsMarkdown(log) {
  let markdown = `# Ford AI Notebook Chat Log\n\n`;
  markdown += `**Exported:** ${new Date().toLocaleString()}\n`;
  markdown += `**Total Messages:** ${log.length}\n\n`;
  markdown += `---\n\n`;
  
  log.forEach(msg => {
    const time = new Date(msg.timestamp).toLocaleTimeString();
    const role = msg.role.charAt(0).toUpperCase() + msg.role.slice(1);
    
    markdown += `### ${role} (${time})\n\n`;
    markdown += `${msg.text}\n\n`;
    markdown += `---\n\n`;
  });
  
  const blob = new Blob([markdown], { type: 'text/markdown' });
  downloadBlob(blob, `codex_chat_${getTimestamp()}.md`);
}

function exportAsCSV(log) {
  let csv = 'Timestamp,Role,Message\n';
  
  log.forEach(msg => {
    const timestamp = msg.timestamp;
    const role = msg.role;
    const text = msg.text.replace(/"/g, '""'); // Escape quotes
    csv += `"${timestamp}","${role}","${text}"\n`;
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadBlob(blob, `codex_chat_${getTimestamp()}.csv`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace(/:/g, '-').split('.')[0];
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function estimateStorageSize(log) {
  const jsonString = JSON.stringify(log);
  const bytes = new Blob([jsonString]).size;
  return formatBytes(bytes);
}

// Search functionality
function searchMessages(log, query) {
  if (!query) return log;
  
  const lowerQuery = query.toLowerCase();
  return log.filter(msg => 
    msg.text.toLowerCase().includes(lowerQuery) ||
    msg.role.toLowerCase().includes(lowerQuery)
  );
}

// Group messages by session
function groupBySession(log) {
  const sessions = {};
  
  log.forEach(msg => {
    const sessionId = msg.sessionId || 'default';
    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }
    sessions[sessionId].push(msg);
  });
  
  return sessions;
}

// Statistics
function getStatistics(log) {
  const stats = {
    totalMessages: log.length,
    userMessages: log.filter(m => m.role === 'user').length,
    assistantMessages: log.filter(m => m.role === 'assistant').length,
    firstMessage: log[0]?.timestamp || null,
    lastMessage: log[log.length - 1]?.timestamp || null,
    averageMessageLength: 0,
    storageSize: estimateStorageSize(log)
  };
  
  if (log.length > 0) {
    const totalLength = log.reduce((sum, msg) => sum + msg.text.length, 0);
    stats.averageMessageLength = Math.round(totalLength / log.length);
  }
  
  return stats;
}