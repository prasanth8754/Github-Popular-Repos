import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, onFilterLang, activeLangId} = props
  const {id, language} = languageDetails

  const filterLang = () => {
    onFilterLang(id)
  }

  const activeLangClassName = activeLangId === id ? 'lang-border' : ''

  return (
    <li className="lang-li-cont">
      <button
        className={`lang-btn ${activeLangClassName}`}
        type="button"
        onClick={filterLang}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
