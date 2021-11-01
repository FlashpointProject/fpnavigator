/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

var Cc = Components.classes;
var Ci = Components.interfaces;
var Cu = Components.utils;

this.EXPORTED_SYMBOLS = [ "ContentLinkHandler" ];

Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/NetUtil.jsm");

XPCOMUtils.defineLazyModuleGetter(this, "Feeds",
  "resource:///modules/Feeds.jsm");
XPCOMUtils.defineLazyModuleGetter(this, "BrowserUtils",
  "resource://gre/modules/BrowserUtils.jsm");

this.ContentLinkHandler = {
  init: function(chromeGlobal) {
    chromeGlobal.addEventListener("DOMLinkAdded", (event) => {
      this.onLinkEvent(event, chromeGlobal);
    }, false);
    chromeGlobal.addEventListener("DOMLinkChanged", (event) => {
      this.onLinkEvent(event, chromeGlobal);
    }, false);
  },

  onLinkEvent: function(event, chromeGlobal) {
    var link = event.originalTarget;
    var rel = link.rel && link.rel.toLowerCase();
    if (!link || !link.ownerDocument || !rel || !link.href)
      return;

    // Ignore sub-frames (bugs 305472, 479408).
    let window = link.ownerGlobal;
    if (window != window.top)
      return;

    var feedAdded = false;
    var iconAdded = false;
    var searchAdded = false;
    var rels = {};
    for (let relString of rel.split(/\s+/))
      rels[relString] = true;

    for (let relVal in rels) {
      switch (relVal) {
        case "feed":
        case "alternate":
          if (!feedAdded && event.type == "DOMLinkAdded") {
            if (!rels.feed && rels.alternate && rels.stylesheet)
              break;

            if (Feeds.isValidFeed(link, link.ownerDocument.nodePrincipal, "feed" in rels)) {
              chromeGlobal.sendAsyncMessage("Link:AddFeed",
                                            {type: link.type,
                                             href: link.href,
                                             title: link.title});
              feedAdded = true;
            }
          }
          break;
        case "icon":
          if (iconAdded || !Services.prefs.getBoolPref("browser.chrome.site_icons"))
            break;

          var uri = this.getLinkIconURI(link);
          if (!uri)
            break;

          chromeGlobal.sendAsyncMessage(
            "Link:SetIcon",
            {url: uri.spec, loadingPrincipal: link.ownerDocument.nodePrincipal});
          iconAdded = true;
          break;
        case "search":
          if (!searchAdded && event.type == "DOMLinkAdded") {
            var type = link.type && link.type.toLowerCase();
            type = type.replace(/^\s+|\s*(?:;.*)?$/g, "");

            let re = /^(?:https?|ftp):/i;
            if (type == "application/opensearchdescription+xml" && link.title &&
                re.test(link.href))
            {
              let engine = { title: link.title, href: link.href };
              chromeGlobal.sendAsyncMessage("Link:AddSearch",
                                            {engine: engine,
                                             url: link.ownerDocument.documentURI});
              searchAdded = true;
            }
          }
          break;
      }
    }
  },

  getLinkIconURI: function(aLink) {
    let targetDoc = aLink.ownerDocument;
    var uri = BrowserUtils.makeURI(aLink.href, targetDoc.characterSet);
    try {
      uri.userPass = "";
    } catch (e) {
      // some URIs are immutable
    }
    return uri;
  },
};
