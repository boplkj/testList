import React, { useCallback, useMemo } from 'react'
import { View, Text, Image } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  useRoute,
  useFocusEffect,
} from '@react-navigation/native'
import { getUserRepo } from '../../services/slices/userRepoSlice'
import OpenUrlButton from '../../components/OpenUrlButton'
import styles from './styles.module.css'

export default function PUserScreen() {
  const route = useRoute()
  const { userId } = route.params
  const users = useSelector((store) => store.getUsers.users)
  const dispatch = useDispatch()
  const user = useMemo(
    () => users.find((item) => item.id === userId), [userId, users],
  )

  useFocusEffect(
    useCallback(() => {
      dispatch(getUserRepo(user.repo.url))
    }, [dispatch]),
  )
  const userRepo = useSelector((store) => store.getUserRepo.userRepo)

  return (
    user 
      ? (
        <View key={user.id} className={styles.userScreen}>
          <View>
            { user.actor.avatar_url
            && (
              <Image
                resizeMode="cover"
                className={styles.image}
                source={{ uri: user.actor.avatar_url }}
              />
            )}
          </View>

          <View>
            <View className={styles.content}>
              <Text className={styles.headerText}>About User:</Text>
            </View>

            <View>
              { user.actor.display_login
          && (
            <Text numberOfLines={1} ellipsizeMode="tail">
              User name: {user.actor.display_login}
            </Text>
          )}
              { user.actor.login
          && (
            <Text numberOfLines={1} ellipsizeMode="tail">
              Login: {user.actor.login}
            </Text>
          )}
            </View>
            { user.repo
        && (
          <View>
            <View className={styles.content}>
              <Text className={styles.headerText}>About Repo:</Text>
            </View>
            <View>
              { user.repo.id
              && (
                <Text>
                  Id: {user.repo.id}
                </Text>
              )}
              { user.repo.name 
              && (
                <Text numberOfLines={1} ellipsizeMode="tail">
                  Name: {user.repo.name}
                </Text>
              )}
            </View>
          </View>
        )}

            { (userRepo && userRepo.html_url)
          && (
          <OpenUrlButton url={userRepo.html_url}>
            View Repo
          </OpenUrlButton>
          )}
          </View>
        </View>
      )
      : <Text> Something went wrong </Text>
  )
}
