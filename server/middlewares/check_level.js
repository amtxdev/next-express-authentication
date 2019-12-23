// middleware for authentication
export default async function authorize(request, _response, next) {
    const apiToken = request.headers['x-api-token'];
    
    // set user on-success
    request.user = await request.db.users.findByApiKey(apiToken);
       
    // always continue to next middleware
    next();
  }