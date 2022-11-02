addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  const workspaceId = 4516727
  const toggl_url = `https://api.track.toggl.com/api/v9/workspaces/${workspaceId}/time_entries`
  
  const nowDate = new Date()
  let body = JSON.stringify({
    "start": nowDate.toISOString(),
    "duration": (-1) * Math.floor(nowDate.getTime() / 1000),
    "created_with": "cloudflare worker",
    "pid": 186782977,
    "wid": workspaceId
  })

  let token = btoa(TOGGL_API_KEY + ':api_token');

  const requestInit = {
    body: body,
    method: 'POST',
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return fetch(toggl_url, requestInit)
  .then((response) => {
    return new Response(JSON.stringify(response.status), {
      headers: { 'content-type': 'text/plain' },
    })
  })
}
