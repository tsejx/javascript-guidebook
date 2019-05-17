const computerNetworks = [
  {
    title: '网络链路',
    link: '',
    children: [
      {
        title: '计算机网络体系',
        link: 'computer-networks'
      },
      {
        title: '传输层协议',
        link: 'transport-layer-protocol'
      },
      {
        title: '网络层协议',
        link: 'network-layer-protocol'
      },
      {
        title: 'DNS 协议',
        link: 'dns',
      },
      {
        title: 'CDN',
        link: 'cdn'
      }
    ],
  },
  {
    title: 'HTTP 协议',
    link: 'http',
    children: [
      {
        title: 'HTTP',
        link: 'http',
      },
      {
        title: 'HTTPS',
        link: 'https',
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
        title: 'HTTP 跨域资源共享',
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
      {
        title: 'HTTP3',
        link: 'http3',
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
