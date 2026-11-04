import json

data = []

def add_sub(f_id, f_name, c_id, c_name, s_id, text):
    data.append({
        "function_id": f_id,
        "function_name": f_name,
        "category_id": c_id,
        "category_name": c_name,
        "subcategory_id": s_id,
        "subcategory_text": text
    })

# GOVERN (GV)
gv = ("GV", "GOVERN")
add_sub(*gv, "GV.OC", "Organizational Context", "GV.OC-01", "The organizational mission is understood and informs cybersecurity risk management decisions.")
add_sub(*gv, "GV.OC", "Organizational Context", "GV.OC-02", "Internal and external stakeholders are understood, and their needs regarding cybersecurity risk are considered.")
add_sub(*gv, "GV.OC", "Organizational Context", "GV.OC-03", "Legal, regulatory, and contractual requirements regarding cybersecurity are understood and managed.")
add_sub(*gv, "GV.OC", "Organizational Context", "GV.OC-04", "Critical objectives, capabilities, and services that external stakeholders depend on are understood.")
add_sub(*gv, "GV.OC", "Organizational Context", "GV.OC-05", "Outcomes, capabilities, and services that the organization depends on are understood and communicated.")

add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-01", "Risk management objectives are established and agreed to by organizational stakeholders.")
add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-02", "Risk appetite and risk tolerance statements are established, communicated, and maintained.")
add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-03", "Cybersecurity risk management activities are included in enterprise risk management (ERM) processes.")
add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-04", "Strategic direction for risk response options is established and communicated.")
add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-05", "Lines of communication to management and stakeholders are established for risk-related information.")
add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-06", "A standardized method for calculating, documenting, and reporting risk is established.")
add_sub(*gv, "GV.RM", "Risk Management Strategy", "GV.RM-07", "Strategic opportunities to improve the security and resilience of systems are identified and prioritized.")

add_sub(*gv, "GV.RR", "Roles, Responsibilities, and Authorities", "GV.RR-01", "Organizational leadership is responsible and accountable for cybersecurity risk decisions.")
add_sub(*gv, "GV.RR", "Roles, Responsibilities, and Authorities", "GV.RR-02", "Roles, responsibilities, and authorities for cybersecurity risk management are established and communicated.")
add_sub(*gv, "GV.RR", "Roles, Responsibilities, and Authorities", "GV.RR-03", "Cybersecurity is integrated into human resources practices (hiring, onboarding, performance reviews).")
add_sub(*gv, "GV.RR", "Roles, Responsibilities, and Authorities", "GV.RR-04", "Adequate resources (personnel, budget, tools) are provided to the cybersecurity program.")

add_sub(*gv, "GV.PO", "Policy", "GV.PO-01", "Organizational cybersecurity policies are established, communicated, and enforced.")
add_sub(*gv, "GV.PO", "Policy", "GV.PO-02", "Policies and procedures are reviewed and updated to reflect changes in requirements and threats.")

add_sub(*gv, "GV.OV", "Oversight", "GV.OV-01", "The cybersecurity risk management strategy and program are reviewed to assess their performance.")
add_sub(*gv, "GV.OV", "Oversight", "GV.OV-02", "The cybersecurity strategy is adjusted to ensure coverage of organizational requirements.")
add_sub(*gv, "GV.OV", "Oversight", "GV.OV-03", "Cybersecurity risk management performance is evaluated for adjustments needed.")

add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-01", "A cybersecurity supply chain risk management (C-SCRM) program is established.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-02", "Roles and responsibilities for suppliers, customers, and partners are established and coordinated.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-03", "C-SCRM is integrated into cybersecurity and enterprise risk management processes.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-04", "Suppliers are known and prioritized by criticality.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-05", "Requirements for cybersecurity in supply chains are integrated into contracts.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-06", "Planning and due diligence are performed before entering new supplier relationships.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-07", "Risks posed by a supplier are understood, recorded, prioritized, and monitored over the relationship.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-08", "Relevant suppliers are included in incident planning, response, and recovery activities.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-09", "Supply chain practices are monitored throughout the technology product/service life cycle.")
add_sub(*gv, "GV.SC", "Supply Chain Risk Management", "GV.SC-10", "Plans include provisions for activities that occur after a partnership or agreement ends.")

# IDENTIFY (ID)
id = ("ID", "IDENTIFY")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-01", "Inventories of hardware managed by the organization are maintained.")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-02", "Inventories of software, services, and systems managed by the organization are maintained.")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-03", "Representations of authorized network communications and data flows are maintained.")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-04", "Inventories of services provided by suppliers are maintained.")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-05", "Assets are prioritized based on classification, criticality, and impact on the mission.")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-07", "Inventories of data and corresponding metadata are maintained.")
add_sub(*id, "ID.AM", "Asset Management", "ID.AM-08", "Systems, hardware, software, and data are managed throughout their life cycles.")

add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-01", "Vulnerabilities in assets are identified, validated, and recorded.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-02", "Cyber threat intelligence is received from information-sharing forums and sources.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-03", "Internal and external threats to the organization are identified and recorded.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-04", "Potential impacts and likelihoods of threats exploiting vulnerabilities are identified.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-05", "Threats, vulnerabilities, and impacts are used to understand inherent risk.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-06", "Risk responses are chosen, prioritized, planned, and tracked.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-07", "Changes and exceptions are managed and assessed for risk impact.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-08", "Processes for receiving and responding to vulnerability disclosures are established.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-09", "The risk of adverse events impacting privacy and civil liberties is assessed.")
add_sub(*id, "ID.RA", "Risk Assessment", "ID.RA-10", "Risk assessments are performed at regular intervals and in response to changes.")

add_sub(*id, "ID.IM", "Improvement", "ID.IM-01", "Improvements are identified from evaluations, audits, and past incidents.")
add_sub(*id, "ID.IM", "Improvement", "ID.IM-02", "Improvements are identified from security tests and exercises (e.g., red teaming).")
add_sub(*id, "ID.IM", "Improvement", "ID.IM-03", "Improvements are identified from the execution of operational processes.")
add_sub(*id, "ID.IM", "Improvement", "ID.IM-04", "Response and recovery plans are established, maintained, and improved.")

# PROTECT (PR)
pr = ("PR", "PROTECT")
add_sub(*pr, "PR.AA", "Identity Management, Authentication, and Access Control", "PR.AA-01", "Identities and credentials for authorized users, services, and hardware are managed.")
add_sub(*pr, "PR.AA", "Identity Management, Authentication, and Access Control", "PR.AA-02", "Identities are proofed and bound to credentials based on the context of interactions.")
add_sub(*pr, "PR.AA", "Identity Management, Authentication, and Access Control", "PR.AA-03", "Users, services, and hardware are authenticated (e.g., Multi-Factor Authentication).")
add_sub(*pr, "PR.AA", "Identity Management, Authentication, and Access Control", "PR.AA-04", "Identity assertions are protected, conveyed, and verified.")
add_sub(*pr, "PR.AA", "Identity Management, Authentication, and Access Control", "PR.AA-05", "Access permissions are managed, enforced, and reviewed (Least Privilege).")
add_sub(*pr, "PR.AA", "Identity Management, Authentication, and Access Control", "PR.AA-06", "Physical access to assets is managed, monitored, and enforced.")

add_sub(*pr, "PR.AT", "Awareness and Training", "PR.AT-01", "All personnel are provided with general cybersecurity awareness and training.")
add_sub(*pr, "PR.AT", "Awareness and Training", "PR.AT-02", "Personnel in specialized roles are provided with specific skills-based training.")

add_sub(*pr, "PR.DS", "Data Security", "PR.DS-01", "Confidentiality, integrity, and availability of data-at-rest are protected.")
add_sub(*pr, "PR.DS", "Data Security", "PR.DS-02", "Confidentiality, integrity, and availability of data-in-transit are protected.")
add_sub(*pr, "PR.DS", "Data Security", "PR.DS-10", "Confidentiality, integrity, and availability of data-in-use are protected.")
add_sub(*pr, "PR.DS", "Data Security", "PR.DS-11", "Backups of data are created, protected, maintained, and tested.")

add_sub(*pr, "PR.PS", "Platform Security", "PR.PS-01", "Configuration management practices are established and applied (hardening).")
add_sub(*pr, "PR.PS", "Platform Security", "PR.PS-02", "Software is maintained, replaced, and removed commensurate with risk.")
add_sub(*pr, "PR.PS", "Platform Security", "PR.PS-03", "Hardware is maintained, replaced, and removed commensurate with risk.")
add_sub(*pr, "PR.PS", "Platform Security", "PR.PS-04", "Log records are generated and made available for monitoring.")
add_sub(*pr, "PR.PS", "Platform Security", "PR.PS-05", "Installation and execution of unauthorized software are prevented.")
add_sub(*pr, "PR.PS", "Platform Security", "PR.PS-06", "Secure software development practices are integrated into the SDLC.")

add_sub(*pr, "PR.IR", "Technology Infrastructure Resilience", "PR.IR-01", "Networks and environments are protected from unauthorized logical access.")
add_sub(*pr, "PR.IR", "Technology Infrastructure Resilience", "PR.IR-02", "Assets are protected from environmental threats (fire, flood, etc.).")
add_sub(*pr, "PR.IR", "Technology Infrastructure Resilience", "PR.IR-03", "Resilience mechanisms are implemented to maintain requirements in adverse situations.")
add_sub(*pr, "PR.IR", "Technology Infrastructure Resilience", "PR.IR-04", "Adequate resource capacity is maintained to ensure availability.")

# DETECT (DE)
de = ("DE", "DETECT")
add_sub(*de, "DE.CM", "Continuous Monitoring", "DE.CM-01", "Networks and network services are monitored for adverse events.")
add_sub(*de, "DE.CM", "Continuous Monitoring", "DE.CM-02", "The physical environment is monitored for adverse events.")
add_sub(*de, "DE.CM", "Continuous Monitoring", "DE.CM-03", "Personnel activity and technology usage are monitored for adverse events.")
add_sub(*de, "DE.CM", "Continuous Monitoring", "DE.CM-06", "External service provider activities are monitored for adverse events.")
add_sub(*de, "DE.CM", "Continuous Monitoring", "DE.CM-09", "Hardware, software, and data are monitored to find potentially adverse events.")

add_sub(*de, "DE.AE", "Adverse Event Analysis", "DE.AE-02", "Potentially adverse events are analyzed to understand associated activities.")
add_sub(*de, "DE.AE", "Adverse Event Analysis", "DE.AE-03", "Information is correlated from multiple sources to analyze events.")
add_sub(*de, "DE.AE", "Adverse Event Analysis", "DE.AE-04", "The estimated impact and scope of adverse events are understood.")
add_sub(*de, "DE.AE", "Adverse Event Analysis", "DE.AE-06", "Information on adverse events is provided to authorized staff and tools.")
add_sub(*de, "DE.AE", "Adverse Event Analysis", "DE.AE-07", "Cyber threat intelligence is integrated into the analysis of adverse events.")
add_sub(*de, "DE.AE", "Adverse Event Analysis", "DE.AE-08", "Incidents are declared when adverse events meet defined criteria.")

# RESPOND (RS)
rs = ("RS", "RESPOND")
add_sub(*rs, "RS.MA", "Incident Management", "RS.MA-01", "The incident response plan is executed in coordination with relevant third parties.")
add_sub(*rs, "RS.MA", "Incident Management", "RS.MA-02", "Incident reports are triaged and validated.")
add_sub(*rs, "RS.MA", "Incident Management", "RS.MA-03", "Incidents are categorized and prioritized.")
add_sub(*rs, "RS.MA", "Incident Management", "RS.MA-04", "Incidents are escalated or elevated as needed.")
add_sub(*rs, "RS.MA", "Incident Management", "RS.MA-05", "Criteria for initiating incident recovery are applied.")

add_sub(*rs, "RS.AN", "Incident Analysis", "RS.AN-03", "Analysis determines what took place and the root cause of the incident.")
add_sub(*rs, "RS.AN", "Incident Analysis", "RS.AN-06", "Investigation actions are recorded; integrity and provenance are preserved.")
add_sub(*rs, "RS.AN", "Incident Analysis", "RS.AN-07", "Incident data and metadata are collected and preserved.")
add_sub(*rs, "RS.AN", "Incident Analysis", "RS.AN-08", "The incident's magnitude is estimated and validated.")

add_sub(*rs, "RS.CO", "Incident Response Reporting and Communication", "RS.CO-02", "Internal and external stakeholders are notified of incidents.")
add_sub(*rs, "RS.CO", "Incident Response Reporting and Communication", "RS.CO-03", "Information is shared with designated stakeholders as required.")
# RS.CO-04 was in search but maybe not in some versions, I'll include it if it was in the table.
add_sub(*rs, "RS.CO", "Incident Response Reporting and Communication", "RS.CO-04", "Voluntary information sharing occurs for situational awareness.")

add_sub(*rs, "RS.MI", "Incident Mitigation", "RS.MI-01", "Incidents are contained to prevent spread.")
add_sub(*rs, "RS.MI", "Incident Mitigation", "RS.MI-02", "Incidents are eradicated (e.g., removing malware, closing vulnerabilities).")

# RECOVER (RC)
rc = ("RC", "RECOVER")
add_sub(*rc, "RC.RP", "Incident Recovery Plan Execution", "RC.RP-01", "The recovery portion of the incident response plan is executed once initiated.")
add_sub(*rc, "RC.RP", "Incident Recovery Plan Execution", "RC.RP-02", "Recovery actions are selected, scoped, prioritized, and performed.")
add_sub(*rc, "RC.RP", "Incident Recovery Plan Execution", "RC.RP-03", "Integrity of backups is verified before use for restoration.")
add_sub(*rc, "RC.RP", "Incident Recovery Plan Execution", "RC.RP-04", "Critical mission functions are considered to establish post-incident norms.")
add_sub(*rc, "RC.RP", "Incident Recovery Plan Execution", "RC.RP-05", "Integrity of restored assets is verified; normal operating status is confirmed.")
add_sub(*rc, "RC.RP", "Incident Recovery Plan Execution", "RC.RP-06", "End of recovery is declared; documentation is completed.")

add_sub(*rc, "RC.CO", "Incident Recovery Communication", "RC.CO-03", "Recovery activities and progress are communicated to stakeholders.")
add_sub(*rc, "RC.CO", "Incident Recovery Communication", "RC.CO-04", "Public updates on incident recovery are shared using approved messaging.")

with open("backend/seed_data.json", "w") as f:
    json.dump(data, f, indent=2)

print(f"Generated seed data with {len(data)} subcategories.")
