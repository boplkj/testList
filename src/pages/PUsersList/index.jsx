import React, { useCallback, useState } from 'react'
import {
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import Item from '../../components/Item'
import { getUsers } from '../../services/slices/usersListSlice'
import {
  TIME_BEFORE_REFRESH,
  TIME_BEFORE_UPDATE,
  REQUEST_PEOPLE_LIMIT,
} from '../../utils/constants'
import styles from './styles.module.css'
import {
  initTimer,
  refreshTimer,
  clearTimer,
  freezeTimer,
  unfreezeTimer,
} from '../../helpers/timer'

export default function PUsersList() {
  const dispatch = useDispatch()
  const users = useSelector((store) => store.getUsers.users)
  const isError = useSelector((store) => store.getUsers.usersError)
  const [isLoadPage, setIsLoadPage] = useState(true)

  useFocusEffect(
    useCallback(() => {
      initTimer(
        () => dispatch(
          getUsers(REQUEST_PEOPLE_LIMIT),
        ), TIME_BEFORE_UPDATE,
      )
      dispatch(getUsers(REQUEST_PEOPLE_LIMIT))
      setIsLoadPage(false)
      return () => {
        setIsLoadPage(true)
        clearTimer()
      }
    }, [dispatch]),
  )

  const onRefresh = () => {
    refreshTimer(TIME_BEFORE_REFRESH)
  }
  return (
    (!isLoadPage)
      ? !isError
        ? (
          <FlatList
            renderItem={
            ({ item }) => <Item data={item} key={item.id} />
          }
            data={users || []}
            onRefresh={onRefresh}
            refreshing={false}
            isScrollBeginDrag={freezeTimer}
            isScrollEndDrag={unfreezeTimer}
          />
        )
        : (
          <View>
            <Text>
              Something went wrong
            </Text>
          </View>
        )
      : (
        <View className={styles.indicator}>
          <ActivityIndicator color="#0000ff" size="large" />
        </View>
      )

  )
}
