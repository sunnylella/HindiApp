import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import * as Speech from 'expo-speech';

interface PronunciationCard {
  hindiWord: string;
  romanization: string;
  englishMeaning: string;
  soundAlike: string;
  phoneticTip: string;
  category: string;
}

const HINDI_PRONUNCIATION_DATA: PronunciationCard[] = [
  {
    hindiWord: 'पानी',
    romanization: 'pānī',
    englishMeaning: 'Water',
    soundAlike: 'Rhymes with "paw-knee", but with a soft, unaspirated "p".',
    phoneticTip: 'Keep your breath light on the "p"—do not over-puff air like the English "P" in "pit".',
    category: 'Essential Daily Words'
  },
  {
    hindiWord: 'खाना',
    romanization: 'khānā',
    englishMeaning: 'Food / Eating',
    soundAlike: 'Sounds like "car-nah" with an exhaled breath ("kh") at the start.',
    phoneticTip: 'The "kh" requires a distinct, audible puff of air coming from the back of the throat.',
    category: 'Essential Daily Words'
  },
  {
    hindiWord: 'छोटा',
    romanization: 'choṭā',
    englishMeaning: 'Small / Little',
    soundAlike: 'Starts like "cho" in choke, followed by a retroflex "ṭ".',
    phoneticTip: 'Curl the tip of your tongue back to touch the roof of your mouth for the "ṭ", unlike the English alveolar "t".',
    category: 'Retroflex Challenge'
  },
  {
    hindiWord: 'बड़ा',
    romanization: 'baṛā',
    englishMeaning: 'Big / Large',
    soundAlike: 'Sounds like "buh-dah" where the "ṛ" is a tongue-flap sound.',
    phoneticTip: 'Flap your tongue quickly down from the roof of your mouth, similar to the American "tt" sound in "butter".',
    category: 'Retroflex Challenge'
  }
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentCard = HINDI_PRONUNCIATION_DATA[currentIndex];

  const speakHindi = (word: string) => {
    Speech.stop();
    Speech.speak(word, {
      language: 'hi-IN',
      pitch: 1.0,
      rate: 0.8,
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HINDI_PRONUNCIATION_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HINDI_PRONUNCIATION_DATA.length) % HINDI_PRONUNCIATION_DATA.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hindi Pronunciation Lab</Text>
        <Text style={styles.headerSubtitle}>Bridge English sounds to authentic Hindi</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{currentCard.category}</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.scriptRow}>
            <Text style={styles.devanagari}>{currentCard.hindiWord}</Text>
            <Text style={styles.romanization}>({currentCard.romanization})</Text>
          </View>

          <Text style={styles.meaning}>{currentCard.englishMeaning}</Text>

          <TouchableOpacity 
            style={styles.audioButton} 
            activeOpacity={0.8}
            onPress={() => speakHindi(currentCard.hindiWord)}
          >
            <Text style={styles.audioButtonText}>🔊 Listen to Native Audio</Text>
          </TouchableOpacity>

          <View style={styles.sectionBox}>
            <Text style={styles.sectionLabel}>English Sound-Alike</Text>
            <Text style={styles.sectionText}>{currentCard.soundAlike}</Text>
          </View>

          <View style={styles.sectionBox}>
            <Text style={styles.sectionLabel}>Pro Pronunciation Tip</Text>
            <Text style={styles.sectionText}>{currentCard.phoneticTip}</Text>
          </View>
        </View>

        <View style={styles.navRow}>
          <TouchableOpacity style={[styles.navButton, styles.secondaryButton]} onPress={handlePrev}>
            <Text style={styles.secondaryButtonText}>← Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.navButton, styles.primaryButton]} onPress={handleNext}>
            <Text style={styles.primaryButtonText}>Next Sound →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  header: { paddingTop: 16, paddingBottom: 16, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#f8fafc' },
  headerSubtitle: { fontSize: 13, color: '#94a3b8', marginTop: 4 },
  scrollContent: { padding: 16, alignItems: 'center' },
  categoryBadge: { backgroundColor: '#1e293b', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16, borderWidth: 1, borderColor: '#334155' },
  categoryText: { color: '#38bdf8', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  card: { width: '100%', maxWidth: 400, backgroundColor: '#1e293b', borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 10, elevation: 6, borderWidth: 1, borderColor: '#334155' },
  scriptRow: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 12, marginBottom: 8 },
  devanagari: { fontSize: 52, fontWeight: 'bold', color: '#38bdf8' },
  romanization: { fontSize: 20, color: '#cbd5e1', fontStyle: 'italic' },
  meaning: { textAlign: 'center', fontSize: 18, color: '#94a3b8', marginBottom: 24, fontWeight: '500' },
  audioButton: { backgroundColor: '#0284c7', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginBottom: 24 },
  audioButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionBox: { backgroundColor: '#0f172a', padding: 14, borderRadius: 12, marginBottom: 14, borderWidth: 1, borderColor: '#334155' },
  sectionLabel: { fontSize: 11, fontWeight: '700', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  sectionText: { fontSize: 15, color: '#e2e8f0', lineHeight: 22 },
  navRow: { flexDirection: 'row', width: '100%', maxWidth: 400, gap: 12, marginTop: 24 },
  navButton: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryButton: { backgroundColor: '#10b981' },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#334155' },
  secondaryButtonText: { color: '#cbd5e1', fontSize: 15, fontWeight: '600' },
});