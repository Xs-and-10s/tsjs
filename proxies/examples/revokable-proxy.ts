// ! revoking a Proxy is irreversible !
const { proxy, revoke } = Proxy.revocable({}, {});
