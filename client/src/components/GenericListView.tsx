import { Flex } from "@chakra-ui/react"
import React from "react";

interface GenericListViewProps<T> {
    list: T[],
    renderItem: (item: T) => React.ReactNode;
}

const GenericListView = <T, >({ list, renderItem  }: GenericListViewProps<T>) => {
  return (
    <Flex
        maxW={'100%'}
        flexDirection={'column'}
        gap={'32px'}
    >
        {list.map((listItem, index: number) => {
            return <React.Fragment key={index}>{renderItem(listItem)}</React.Fragment>
        })}
    </Flex>
  )
}

export default GenericListView