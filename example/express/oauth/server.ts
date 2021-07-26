import {Express as OAuthServer} from '../../../lib'
import model from '../model'


export default new OAuthServer({
  oauthOptions: {
    model: model,
    grants: ['authorization_code', 'refresh_token'],
    accessTokenLifetime: 60 * 60 * 24, // 24 hours, or 1 day
    allowEmptyState: true,
    allowExtendedTokenAttributes: true,
    alwaysIssueNewRefreshToken: true,
  },
  continueMiddleware: false,
})
