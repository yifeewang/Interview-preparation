import React, { memo, useState, useMemo, useCallback, useRef } from "react";
import logo from '@/logo.svg';
import Virlist3 from '@/components/Virlist3'
import './App.css';

const ItemBox = memo(({data = "", index = 0, style = {}}) => {
    return (
        <div style={style} id={`item-${index}`}>
            {data}
        </div>
    )
})

function App() {
    const [items] = useState(Array(10000).fill(1))
  return (
    <div className="App">
      <Virlist3 ItemBox={ItemBox} list={items} containerHeight={500}/>
    </div>
  );
}

export default App;
