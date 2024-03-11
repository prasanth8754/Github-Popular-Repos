import './index.css'

const RepositoryItem = props => {
  const {reposDetails} = props
  const {id, name, issuesCount, forksCount, starsCount, avatarUrl} =
    reposDetails

  return (
    <li className="repos-li-cont">
      <img className="repos-img" src={avatarUrl} alt={name} />
      <h1 className="repos-h1">{name}</h1>
      <div className="count-cont-1">
        <div className="count-cont-2">
          <img
            className="count-img"
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
          />
          <p className="count-p">{`${starsCount} stars`}</p>
        </div>
        <div className="count-cont-2">
          <img
            className="count-img"
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
          />
          <p className="count-p">{`${forksCount} forks`}</p>
        </div>
        <div className="count-cont-2">
          <img
            className="count-img"
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
          />
          <p className="count-p">{`${issuesCount} open issues`}</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
