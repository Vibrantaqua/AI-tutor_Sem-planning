import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

interface PDFDocumentProps {
  lessonPlan: {
    subject: string
    weeks: number
    topics: string[]
  }
}

export function PDFDocument({ lessonPlan }: PDFDocumentProps) {
  const styles = StyleSheet.create({
    page: { padding: 30 },
    section: { marginBottom: 10 },
    title: { fontSize: 18, marginBottom: 5 },
    text: { fontSize: 12 }
  })

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>{lessonPlan.subject}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Weeks: {lessonPlan.weeks}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Topics:</Text>
          {lessonPlan.topics.map((topic, i) => (
            <Text key={i} style={styles.text}>- {topic}</Text>
          ))}
        </View>
      </Page>
    </Document>
  )
}
