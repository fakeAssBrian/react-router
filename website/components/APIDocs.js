import React from 'react'
import { I, H, B, PAD, lightGray, red } from './bricks'
import { render } from 'react-dom'
import MarkdownViewer from './MarkdownViewer'
import ScrollToMe from './ScrollToMe'
import Match from '../../modules/Match'

export const API = [
  { name: 'Match',
    path: '/Match',
    html: require('../api/Match.md')
  },
  { name: 'Miss',
    path: '/Miss',
    html: require('../api/Miss.md')
  },
  { name: 'MatchRoutes',
    path: '/MatchRoutes',
    html: require('../api/MatchRoutes.md')
  },
  { name: 'Link',
    path: '/Link',
    html: require('../api/Link.md')
  },
  { name: 'NavigationPrompt',
    path: '/NavigationPrompt',
    html: require('../api/NavigationPrompt.md')
  },
  { name: 'Redirect',
    path: '/Redirect',
    html: require('../api/Redirect.md')
  },
  { name: 'BrowserRouter',
    path: '/BrowserRouter',
    html: require('../api/BrowserRouter.md')
  },
  { name: 'HashRouter',
    path: '/HashRouter',
    html: require('../api/HashRouter.md')
  },
  { name: 'MemoryRouter',
    path: '/MemoryRouter',
    html: require('../api/MemoryRouter.md')
  },
  { name: 'ServerRouter',
    path: '/ServerRouter',
    html: require('../api/ServerRouter.md')
  }
]

const $ = (node, selector) => (
  [].slice.call(node.querySelectorAll(selector))
)

class APIDocs extends React.Component {
  componentDidMount() {
    const items = $(this.el, '.api-entry').map(entry => {
      const name = $(entry, 'h1')[0].childNodes[1].textContent.trim()
      const hash = $(entry, 'h1 a')[0].hash
      const children = $(entry, 'h2').map(node => ({
        name: node.childNodes[1].textContent.trim(),
        hash: $(node, 'a')[0].hash
      }))
      return { name, hash, children }
    })
    this.renderMenu(items)
  }

  renderMenu(items) {
    const el = (
      <B fontFamily="Monaco, monospace">
        {items.map(item => (
          <B key={item.hash} margin="10px">
            <B component="a" props={{ href: item.hash }} fontWeight="bold" color={red} hoverTextDecoration="underline">{item.name}</B>
            <B marginLeft="20px">
              {item.children.map(({ hash, name }) => (
                <B key={hash} component="a" props={{ href: hash }} color={lightGray} hoverTextDecoration="underline">{name}</B>
              ))}
            </B>
          </B>
        ))}
      </B>
    )
    render(el, this.menu)
  }

  render() {
    return (
      <B props={{ ref: n => this.el = n }}>
        <Match pattern="/api" exactly={true} component={ScrollToMe}/>
        <H height="100vh">
          <B props={{ ref: n => this.menu = n }} height="100%" overflow="auto" fontSize="80%" padding="40px" background="#f0f0f0"/>
          <B flex="1" height="100%" overflow="auto">
            {API.map((doc, i) => (
              <B className="api-entry" key={i} padding="40px 60px">
                <MarkdownViewer html={doc.html}/>
              </B>
            ))}
          </B>
        </H>
      </B>
    )
  }
}

export default APIDocs
