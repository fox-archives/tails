/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap">
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>docs</h5>
            <a href={this.docUrl('start.html', this.props.language)}>
              getting started
            </a>
            <a href={this.docUrl('guides.html', this.props.language)}>
              guides
            </a>
            <a href={this.docUrl('api.html', this.props.language)}>
              api reference
            </a>
          </div>
          <div>
            <h5>community</h5>
            <a href={this.pageUrl('users.html', this.props.language)}>
              user showcase
            </a>
            <a href="https://discordapp.com/">project chat</a>
            <a
              href="https://twitter.com/edwinkofler"
              target="_blank"
              rel="noreferrer noopener">
              twitter
            </a>
          </div>
          <div>
            <h5>more</h5>
            <a href={`${this.props.config.baseUrl}blog`}>blog</a>
            <a href="https://github.com/">github</a>
            <a
              className="github-button"
              href={this.props.config.repoUrl}
              data-icon="octicon-star"
              data-count-href="/facebook/docusaurus/stargazers"
              data-show-count="true"
              data-count-aria-label="# stargazers on github"
              aria-label="star this project on github">
              Star
            </a>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
