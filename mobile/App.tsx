import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { StatusBar } from 'expo-status-bar';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const palette = {
  bg: '#000000',
  primary: '#001F3F',
  accent: '#FFD700',
  text: '#FFFFFF',
};

const mockSlides = [
  {
    id: 'slide-1',
    title: 'Sky Harbor',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80',
    tagline: 'A gripping sci-fi saga',
  },
  {
    id: 'slide-2',
    title: 'Night City Pulse',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    tagline: 'Cyberpunk thriller',
  },
];

const mockRow = [
  {
    id: 'm1',
    title: 'Crimson Trail',
    image: 'https://images.unsplash.com/photo-1529108190281-9c171187fa19?auto=format&fit=crop&w=600&q=80',
    badge: 'Original',
  },
  {
    id: 'm2',
    title: 'Echoes of Yama',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    badge: 'Original',
  },
];

export default function App() {
  const [profileName, setProfileName] = useState('Guest');

  useEffect(() => {
    // placeholder for Supabase profile selection logic
    setProfileName('Main Profile');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.logo}>Yama&apos;s</Text>
          <Text style={styles.subtext}>{profileName}</Text>
        </View>

        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} style={styles.heroCarousel}>
          {mockSlides.map((slide) => (
            <View key={slide.id} style={styles.heroCard}>
              <Image source={{ uri: slide.image }} style={styles.heroImage} />
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>{slide.title}</Text>
                <Text style={styles.subtext}>{slide.tagline}</Text>
                <View style={styles.rowGap}>
                  <TouchableOpacity style={styles.playButton}>
                    <Text style={{ color: '#000', fontWeight: '700' }}>Play</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.infoButton}>
                    <Text style={{ color: palette.text }}>Info</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <Section title="Continue Watching" items={mockRow} />
        <Section title="Yama's Originals" items={mockRow} />
        <Section title="Yama's Choice" items={mockRow} />

        <View style={styles.card}> 
          <Text style={styles.sectionTitle}>Cinema Mode</Text>
          <Text style={styles.body}>Toggle on the player to favor the highest quality HLS variant and dim the UI.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Section = ({ title, items }: { title: string; items: { id: string; title: string; image: string; badge?: string }[] }) => (
  <View style={{ marginTop: 16 }}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 8 }}>
      {items.map((item) => (
        <View key={item.id} style={styles.movieCard}>
          <Image source={{ uri: item.image }} style={styles.poster} />
          <Text style={styles.body}>{item.title}</Text>
          {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    color: palette.text,
    fontWeight: '800',
  },
  subtext: {
    color: '#aaaaaa',
    fontStyle: 'italic',
  },
  heroCarousel: {
    height: 280,
  },
  heroCard: {
    width: 320,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  heroImage: {
    width: '100%',
    height: 220,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
  },
  heroTitle: {
    fontSize: 22,
    color: palette.text,
    fontWeight: '800',
  },
  rowGap: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  playButton: {
    backgroundColor: palette.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  infoButton: {
    borderColor: palette.text,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    color: palette.text,
    fontWeight: '700',
    paddingHorizontal: 16,
  },
  body: {
    color: palette.text,
    paddingHorizontal: 16,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#0f0f0f',
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  movieCard: {
    width: 140,
    marginHorizontal: 8,
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  badge: {
    backgroundColor: palette.primary,
    color: palette.text,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 4,
  },
});
