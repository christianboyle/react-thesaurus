/* eslint-disable jsx-quotes */
/* eslint-disable semi */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { fetchSynonyms } from './api/fetchSynonyms'
import './App.css'
import { useGetSynonyms } from './hooks/useGetSynonyms'

const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.datamuse.com'

function App() {
  const [word, setWord] = useState('')
  const { isLoading, synonyms, getSynonyms } = useGetSynonyms()

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault()
    getSynonyms(word)
  }

  const handleSynonymClicked = (newWord: string) => {
    setWord(newWord)
    getSynonyms(newWord)
  }

  return (
    <div className='App'>
      <form onSubmit={handleFetchSynonyms}>
        <label htmlFor='word-input'>Your Word</label>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          id='word-input'
        />
        <button type='submit'>Submit</button>
      </form>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {synonyms.map((synonym) => (
            <li
              onClick={() => handleSynonymClicked(synonym.word)}
              key={synonym.word}
            >
              {synonym.word}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
