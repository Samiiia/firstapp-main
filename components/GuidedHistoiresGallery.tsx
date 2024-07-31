import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import React from 'react';
import { GalleryPreviewData } from '@/constants/models/HistoiresCategory';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface GuidedHistoiresGalleryProps {
    title: string;
    previews: GalleryPreviewData[];
}

const GuidedHistoiresGallery = ({
    title,
    previews,
}: GuidedHistoiresGalleryProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={previews}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Link href={`/pages/histoire/${item.id}`} asChild>
                            <Pressable>
                                <View style={styles.imageContainer}>
                                    <Image
                                        source={item.image}
                                        resizeMode="cover"
                                        style={styles.image}
                                    />
                                    <LinearGradient
                                        colors={['rgba(0,0,0,1)', 'transparent']}
                                        style={styles.gradient}
                                    />
                                </View>
                            </Pressable>
                        </Link>
                    )}
                    horizontal
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    titleContainer: {
        marginBottom: 10,
    },
    title: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19,
        textAlign: 'center',
    },
    flatListContainer: {
        marginVertical: 1,
    },
    imageContainer: {
        height: 150,
        width: 300,
        borderRadius: 10,
        marginRight: 10,
        marginLeft: 40,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        width: 200,
        height: 100,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject, 
    },
    flatListContent: {
        alignItems: 'center',
    },
});

export default GuidedHistoiresGallery;
