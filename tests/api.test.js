const request = require('supertest');
const { app, server } = require('../index');

// Close server after all tests complete
afterAll(() => server.close());

describe('Resource Management API', () => {
  let resourceId;

  it('POST /add-resource should create a resource', async () => {
    // Define the resource object to be sent to the API
    const newResource = {
      name: 'API Test',
      location: 'Loc',
      description: 'Desc',
      owner: 'api@test.com',
    };
  
    // Send a POST request to /add-resource with the new resource data
    const res = await request(app).post('/add-resource').send(newResource);
  
    // Verify that the API returned the correct status code
    expect(res.status).toBe(201);
  
    // Check that the new resource exists in the returned list
    expect(res.body.some(r => r.name === newResource.name)).toBe(true);
  
    // Store the resource ID for later tests (edit, delete)
    resourceId = res.body[res.body.length - 1].id;
  });

  // Test case to verify that all resources can be retrieved
  it('GET /view-resources should return resources', async () => {
    // Send a GET request to retrieve all resources
    const res = await request(app).get('/view-resources');
    
    // Verify that the response status code is 200 (OK)
    expect(res.status).toBe(200);
    
    // Check that the previously added resource appears in the list
    expect(res.body.some(r => r.id === resourceId)).toBe(true);
  });
  
  it('PUT /edit-resource should update a resource', async () => {
    // Define the resource object to be sent to the API
    const newResource = {
      name: 'API Test Updated',
      location: 'Loc',
      description: 'Desc',
      owner: 'api@test.com'
    };
  
    // Send a POST request to /add-resource with the new resource data
    const res = await request(app).put('/edit-resource/' + resourceId).send(newResource);
  
    // Verify that the API returned the correct status code
    expect(res.status).toBe(200);
  
    // Check that the new resource exists in the returned list
    expect(res.body.resource.name).toBe('API Test Updated');
  
  });

  it('DELETE /delete-resource should delete a resource', async () => {  
    // Send a POST request to /add-resource with the new resource data
    const res = await request(app).del('/delete-resource/' + resourceId) ;
  
    // Verify that the API returned the correct status code
    expect(res.status).toBe(200);
  
    // Retrieve list of resources
    const getRes = await request(app).get('/view-resources');

    // Check that the new resource exists in the returned list
    expect(getRes.body.some(r => r.id === resourceId)).toBe(false); 
  
  });

});
