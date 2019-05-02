const computerNetworks = [
  {
    title: 'HTTP 协议',
    link: 'http',
    children: [
      {
        title: 'HTTP',
        link: 'http',
      },
      {
        title: 'HTTP 首部字段',
        link: 'headers',
      },
      {
        title: 'HTTP 请求方法',
        link: 'request-methods',
      },
      {
        title: 'HTTP 状态码',
        link: 'response-status-codes',
      },
      {
        title: 'HTTP 跨域資源共享',
        link: 'access-control',
      },
      {
        title: 'HTTP 身份验证',
        link: 'authentication',
      },
      {
        title: 'HTTP2',
        link: 'http2',
      },
    ],
  },
  {
    title: '其他网络协议',
    link: '',
    children: [
      {
        title: 'DNS 协议',
        link: 'dns',
      },
      {
        title: 'HTTPS',
        link: 'https',
      },
    ],
  },
  {
    title: 'Web 安全',
    link: 'frontend-security',
    children: [
      {
        title: 'XSS',
        link: 'xss',
      },
      {
        title: 'CSRF',
        link: 'csrf',
      },
      {
        title: 'DDoS',
        link: 'ddos',
      },
      {
        title: 'SQL注入',
        link: 'sql-injection',
      },
      {
        title: '流量劫持',
        link: 'hijacking',
      },
      {
        title: '同源策略',
        link: 'same-origin-policy'
      }
    ],
  },
];

module.exports = {
  computerNetworks,
};
