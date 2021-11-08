import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles.module.css'

export default function Item({ data }) {
  const navigation = useNavigation()

  return (
    { data } 
    && (
    <TouchableOpacity
      onPress={() => navigation.navigate('PUserScreen', { userId: data.id })}
      className={styles.item}
    >
      <View className={styles.id}>
        {data.id
        && (
          <Text className={styles.cardId}>
            id: {data.id}
          </Text>
        )}
      </View>
      <View className={styles.content}>
        <View className={styles.leftHalf}>
          { data.actor.avatar_url
          && (
            <Image
              className={styles.image}
              source={{ uri: data.actor.avatar_url }}
            />
          )}
        </View>
        <View className={styles.rightHalf}>
          { data.actor.display_login
          && (
            <Text 
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              User name: {data.actor.display_login}
            </Text>
          )} 
          { data.actor.login
          && (
            <Text 
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Login: {data.actor.login}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
    )
  )
}
Item.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    actor: PropTypes.shape({
      avatar_url: PropTypes.string,
      display_login: PropTypes.string,
      login: PropTypes.string,
    }).isRequired, 
  }).isRequired,
}
