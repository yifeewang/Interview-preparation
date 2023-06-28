import React, { memo, useState, useMemo, useCallback, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: ${({ height }) => height};
`
const ListBox = styled.div`
  background-color: pink;
  position: relative;
`
const VirList3 = memo(function ({ list = [], containerHeight = 800, ItemBox = <></>, itemHeight = 50, ...props }) {
  const ContainerRef = useRef();
  const [startIndex, setStartIndex] = useState(0);
  // 用于撑开Container的盒子，计算其高度
  const wraperHeight = useMemo(function () {
    return list.length * itemHeight;
  }, [list, itemHeight])
  // 可视区域最多显示的条数
  const limit = useMemo(function () {
    return Math.ceil(containerHeight / itemHeight);
  }, [startIndex]);
  // 当前可视区域显示的列表的结束索引
  const endIndex = useMemo(function () {
    return Math.min(startIndex + limit, list.length - 1);
  }, [startIndex, limit]);

  const handleSrcoll = useCallback(function (e) {
    if (e.target !== ContainerRef.current) return;
    const scrollTop = e.target.scrollTop;
    let currentIndex = Math.floor(scrollTop / itemHeight);
    if (currentIndex !== startIndex) {
      setStartIndex(currentIndex);
    }
  }, [ContainerRef, itemHeight, startIndex])

  const renderList = useCallback(function () {
    const rows = [];
    for (let i = startIndex; i <= endIndex; i++) {
      // 渲染每个列表项
      rows.push(<ItemBox
        data={i}
        key={i}
        style={{
          width: "100%",
          height: itemHeight - 1 + "px",
          borderBottom: "1px solid #aaa",
          position: "absolute",
          top: i * itemHeight + "px",
          left: 0,
          right: 0,
        }} />)
    }
    return rows;
  }, [startIndex, endIndex, ItemBox])

  return (<Container
    height={containerHeight + "px"}
    ref={ContainerRef}
    onScroll={handleSrcoll}>
    <ListBox
      style={{ height: wraperHeight + "px" }}>
      {renderList()}
    </ListBox>
  </Container>)
})
export default VirList3;