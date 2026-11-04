import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SubcategoryAssessment, SignatureDetails } from '../types';

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#333' },
  header: { marginBottom: 20, borderBottom: 2, borderBottomColor: '#2563eb', paddingBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e3a8a' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 4 },
  section: { marginTop: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#1e40af', borderBottom: 1, borderBottomColor: '#e5e7eb', paddingBottom: 5, marginBottom: 10 },
  table: { display: 'flex', width: 'auto', marginTop: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#f3f4f6', minHeight: 25, alignItems: 'center' },
  tableHeader: { backgroundColor: '#f8fafc', fontWeight: 'bold' },
  colId: { width: '15%', padding: 5 },
  colScore: { width: '10%', padding: 5 },
  colRec: { width: '65%', padding: 5 },
  signatureBox: { marginTop: 15, padding: 15, backgroundColor: '#f8fafc', borderRadius: 4, border: 1, borderColor: '#e2e8f0' },
  signatureRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 },
  signatureField: { width: '48%' },
  signatureLine: { borderBottomWidth: 1, borderBottomColor: '#1e293b', marginTop: 30, marginBottom: 5 },
  signatureText: { fontSize: 9, color: '#475569' },
  signatureValue: { fontSize: 11, fontWeight: 'bold', color: '#0f172a' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 8, color: '#94a3b8', textAlign: 'center', borderTop: 1, borderTopColor: '#e5e7eb', paddingTop: 10 }
});

interface PDFReportProps {
  assessments: Record<string, SubcategoryAssessment>;
  aiSuggestions: Record<string, any>;
  dashboardData: any[];
  signatureDetails?: SignatureDetails;
}

const PDFReport: React.FC<PDFReportProps> = ({ assessments, aiSuggestions, dashboardData, signatureDetails }) => {
  const gaps = Object.values(assessments).filter(asmt => {
    const current = parseInt(asmt.maturity_score || '0');
    const target = parseInt(asmt.target_score || '0');
    return target > current;
  });

  const assessmentDate = signatureDetails?.assessmentDate || new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>NIST CSF 2.0 Gap Analysis Report</Text>
          <Text style={styles.subtitle}>
            Organization: {signatureDetails?.organizationName || 'Internal Organization'} | Generated on {assessmentDate}
          </Text>
        </View>

        {/* Executive Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Executive Summary</Text>
          <Text>This report outlines the gaps between current cybersecurity maturity and target objectives based on the NIST CSF 2.0 framework.</Text>

          <View style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap' }}>
            {dashboardData.map(d => (
              <View key={d.subject} style={{ width: '33%', marginBottom: 8 }}>
                <Text style={{ fontWeight: 'bold', color: '#2563eb' }}>{d.subject}</Text>
                <Text>Maturity: {d.A}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Gap Analysis */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Detailed Gap Analysis ({gaps.length} Gaps Identified)</Text>
          {gaps.length === 0 ? (
            <Text style={{ color: '#16a34a', marginTop: 8 }}>No security maturity gaps identified. All target scores are met.</Text>
          ) : (
            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.colId}>Subcategory</Text>
                <Text style={styles.colScore}>Current</Text>
                <Text style={styles.colScore}>Target</Text>
                <Text style={styles.colRec}>Remediation Recommendation</Text>
              </View>
              {gaps.map(gap => (
                <View key={gap.subcategory_id} style={styles.tableRow}>
                  <Text style={styles.colId}>{gap.subcategory_id}</Text>
                  <Text style={styles.colScore}>{gap.maturity_score}%</Text>
                  <Text style={styles.colScore}>{gap.target_score}%</Text>
                  <Text style={styles.colRec}>
                    {aiSuggestions[gap.subcategory_id]?.recommendation || "No specific recommendation provided."}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Signature & Sign-Off Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Assessment Sign-Off & Authorization</Text>
          <Text style={{ fontSize: 9, color: '#475569' }}>
            By signing below, the designated lead assessor certifies that this NIST CSF 2.0 self-assessment has been conducted thoroughly and accurately reflects the organization's current cybersecurity posture.
          </Text>

          <View style={styles.signatureBox}>
            <View style={styles.signatureRow}>
              <View style={styles.signatureField}>
                <Text style={styles.signatureText}>Lead Assessor Name:</Text>
                <Text style={styles.signatureValue}>{signatureDetails?.assessorName || '_________________________'}</Text>
              </View>
              <View style={styles.signatureField}>
                <Text style={styles.signatureText}>Assessor Title / Role:</Text>
                <Text style={styles.signatureValue}>{signatureDetails?.assessorTitle || '_________________________'}</Text>
              </View>
            </View>

            <View style={styles.signatureRow}>
              <View style={styles.signatureField}>
                <Text style={styles.signatureText}>Digital Signature / Authorization:</Text>
                <View style={styles.signatureLine} />
                <Text style={{ fontSize: 8, color: '#64748b', fontStyle: 'italic' }}>
                  {signatureDetails?.signatureText || '[ Authorized Signature ]'}
                </Text>
              </View>

              <View style={styles.signatureField}>
                <Text style={styles.signatureText}>Date Signed:</Text>
                <Text style={[styles.signatureValue, { marginTop: 15 }]}>{assessmentDate}</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          NIST CSF 2.0 Self-Assessment Tool | Confidential & Internal Use Only
        </Text>
      </Page>
    </Document>
  );
};

export default PDFReport;
