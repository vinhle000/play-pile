import React, {useContext, useState} from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import SearchResultsListItem from './SearchResultsListItem'
import { Link } from 'react-router-dom'


function SearchResultsList({games, userPlayPileGamesByIgdbId}) {

  if(!games) {
    return <div>Loading...</div>
  }
    return (
      <ul role="list" className="mx-4 py-5 space-y-4 divide-gray-100">
      {games.map((game) => (
        <SearchResultsListItem key={game.igdbId}   game={game} userPlayPileGameData={userPlayPileGamesByIgdbId[game.igdbId]}/>
      ))}
      </ul>
    )
}

export default SearchResultsList