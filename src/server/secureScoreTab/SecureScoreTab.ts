import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/secureScoreTab/index.html")
@PreventIframe("/secureScoreTab/config.html")
@PreventIframe("/secureScoreTab/remove.html")
export class SecureScoreTab {
}
