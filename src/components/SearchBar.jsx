import React, { useState } from 'react'

export default function SearchBar({onSearch}) {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <div>
      <label>Search</label>
      <input type='text' placeholder='输入任务标题以开始搜索...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
      <button type='button' onClick={() => onSearch(searchQuery)}>搜索</button>
      </div>
  )
}
