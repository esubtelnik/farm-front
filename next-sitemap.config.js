/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://farmbasket.by', 
  generateRobotsTxt: true,         
  changefreq: 'weekly',               
  priority: 0.7,                  
  sitemapSize: 5000,        
 
  exclude: [
    "/auth",
    "/auth/*",
    "/profile",
    "/cart",
    "/courier/*",
    "/producer/*",
    "/customer/*",
    "/admin",
    "/admin/*",
    "/api/*",
  ],

};

module.exports = config;
