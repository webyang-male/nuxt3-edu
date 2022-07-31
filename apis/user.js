export function useLoginApi(body) {
  return useHttpPost("login", "/login", {
    body,
  });
}
