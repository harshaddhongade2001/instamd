import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const images = [
    { id: '1', src: 'https://www.shutterstock.com/image-vector/male-female-cleaning-staff-working-600nw-2003990312.jpg' },
    { id: '2', src: 'https://www.shutterstock.com/image-photo/team-professional-janitors-using-equipment-260nw-1934630393.jpg' },
    { id: '3', src: 'https://www.shutterstock.com/image-vector/mopping-hospital-floor-surfaces-flat-260nw-2252925867.jpg' },
 ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    flatListRef.current.scrollToIndex({ animated: true, index: currentIndex });
  }, [currentIndex]);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item.src }} style={styles.image} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    margin:10,
    padding:10,
    borderRadius:8,
    backgroundColor:'#f0f8ff'
  },
  image: {
    width: width,
    height: '100%',
    resizeMode: 'cover',
    borderRadius:8,
  },
});

export default Banner;
