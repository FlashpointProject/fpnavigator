// Flashpoint branding

#filter substitution
#filter emptyLines

// Interval: Time between checks for a new version (in seconds)
pref("app.update.interval", 86400); // 1 day

// The time interval between the downloading of mar file chunks in the
// background (in seconds)
// 0 means "download everything at once"
pref("app.update.download.backgroundInterval", 0);

// Give the user x seconds to react before showing the big UI. default=192 hours
pref("app.update.promptWaitTime", 691200);

// The number of days a binary is permitted to be old
// without checking for an update.  This assumes that
// app.update.checkInstallTime is true.
pref("app.update.checkInstallTime.days", 14);

// Give the user x seconds to reboot before showing a badge on the hamburger
// button. default=immediately
pref("app.update.badgeWaitTime", 0);


// Branding Specific Preferences
pref("startup.homepage_override_url", "");
pref("startup.homepage_welcome_url", "");
pref("startup.homepage_welcome_url.additional", "");

// Version release notes
pref("app.releaseNotesURL", "about:blank");

// Vendor home page
pref("app.vendorURL", "about:");

pref("app.update.url", "");

// URL user can browse to manually if for some reason all update installation
// attempts fail.
pref("app.update.url.manual", "about:");
// A default value for the "More information about this update" link
// supplied in the "An update is available" page of the update wizard.
pref("app.update.url.details", "about:");

// Switch Application Updates off for unofficial branding
pref("app.update.enabled", false);