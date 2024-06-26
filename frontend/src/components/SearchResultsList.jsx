import React, {useContext, useState} from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import SearchResultsListItem from './SearchResultsListItem'
import { Link } from 'react-router-dom'

function SearchResultsList({games, userPlayPileGamesByIgdbId, setSelectedGame, setOpenModal}) {

    return (
      <ul role="list" className="mx-4 py-5 space-y-4 divide-gray-100">
      {games && games.map((game) => (
        <SearchResultsListItem
          key={game.igdbId}
          game={game}
          userPlayPileGameData={userPlayPileGamesByIgdbId[game.igdbId]}
          setSelectedGame={setSelectedGame}
          setOpenModal={setOpenModal}
        />
      ))}
      </ul>
    )
}

export default SearchResultsList