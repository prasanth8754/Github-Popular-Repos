import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const activeViewsConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    githubRepos: [],
    activeLangId: languageFiltersData[0].id,
    activeView: activeViewsConstant.initial,
  }

  componentDidMount() {
    this.getGithubRepos()
  }

  onFilterLang = id => {
    this.setState({activeLangId: id}, this.getGithubRepos)
  }

  onSuccessResponse = popularRepos => {
    this.setState({
      githubRepos: popularRepos,
      activeView: activeViewsConstant.success,
    })
  }

  onFailureResponse = () => {
    this.state({activeView: activeViewsConstant.failure})
  }

  getGithubRepos = async () => {
    this.setState({activeView: activeViewsConstant.loading})

    const {activeLangId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeLangId}`

    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.popular_repos.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.onSuccessResponse(updatedData)
    } else {
      this.onFailureResponse()
    }
  }

  renderSuccessView = () => {
    const {githubRepos} = this.state

    return (
      <ul className="repos-ul-cont">
        {githubRepos.map(eachItem => (
          <RepositoryItem reposDetails={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="err-cont">
      <img
        className="err-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="err-h1">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-cont">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    </div>
  )

  render() {
    const {githubRepos, activeView, activeLangId} = this.state

    const renderReposFields = () => {
      switch (activeView) {
        case activeViewsConstant.loading:
          return this.renderLoadingView()
        case activeViewsConstant.success:
          return this.renderSuccessView()
        case activeViewsConstant.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return (
      <div className="bg-cont">
        <h1 className="main-heading">Popular</h1>
        <ul className="lang-ul-cont">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              languageDetails={eachItem}
              key={eachItem.id}
              onFilterLang={this.onFilterLang}
              activeLangId={activeLangId}
            />
          ))}
        </ul>
        {renderReposFields()}
      </div>
    )
  }
}

export default GithubPopularRepos
