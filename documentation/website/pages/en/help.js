const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock

function Help(props) {
  const { config: siteConfig, language = '' } = props
  const { baseUrl, docsUrl } = siteConfig
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
  const langPart = `${language ? `${language}/` : ''}`
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

  const supportLinks = [
    {
      content: `learn more using the [documentation on this site.](${docUrl(
        'doc1.html'
      )})`,
      title: 'browse docs'
    },
    {
      content: 'ask questions about the documentation and project',
      title: 'join the community'
    },
    {
      content: "find out what's new with this project",
      title: 'stay up to date'
    }
  ]

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>need help</h1>
          </header>
          <p>this project is maintained by an amazing group of people</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  )
}

module.exports = Help
