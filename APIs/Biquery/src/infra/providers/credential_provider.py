class SessionCredentialProvider:
    __key = 'credentials'

    def set_credentials(self, scope, credentials):
        scope.ctx.session[SessionCredentialProvider.__key] = credentials
    
    def get_credentials(self, scope):
        return scope.ctx.session[SessionCredentialProvider.__key]

    def has_credentials(self, scope):
        return SessionCredentialProvider.__key in scope.ctx.session