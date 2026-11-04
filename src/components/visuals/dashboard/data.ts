/**
 * FICTIONAL SAMPLE DATA for illustrative interface mockups.
 * No real patients, facilities or Prime-Techmate deployments are represented.
 */

export const visits14 = [
  { d: "1", opd: 182, fu: 96 },
  { d: "2", opd: 196, fu: 104 },
  { d: "3", opd: 174, fu: 92 },
  { d: "4", opd: 208, fu: 118 },
  { d: "5", opd: 221, fu: 121 },
  { d: "6", opd: 164, fu: 88 },
  { d: "7", opd: 142, fu: 74 },
  { d: "8", opd: 198, fu: 112 },
  { d: "9", opd: 216, fu: 126 },
  { d: "10", opd: 231, fu: 131 },
  { d: "11", opd: 224, fu: 128 },
  { d: "12", opd: 242, fu: 137 },
  { d: "13", opd: 186, fu: 101 },
  { d: "14", opd: 254, fu: 142 },
];

export const departments = [
  { name: "General OPD", value: 412 },
  { name: "Maternal & Child Health", value: 268 },
  { name: "Laboratory", value: 221 },
  { name: "Pharmacy", value: 187 },
  { name: "Dental", value: 96 },
];

export const recentRegistrations = [
  { id: "DEMO-10482", name: "A. M.", age: 34, sex: "F", unit: "General OPD", time: "09:42" },
  { id: "DEMO-10481", name: "K. O.", age: 52, sex: "M", unit: "Laboratory", time: "09:38" },
  { id: "DEMO-10480", name: "E. A.", age: 27, sex: "F", unit: "Maternal Health", time: "09:31" },
  { id: "DEMO-10479", name: "Y. B.", age: 8, sex: "M", unit: "Child Welfare", time: "09:24" },
];

export const facilities = [
  { name: "Demo District Hospital", status: "Online", load: 82 },
  { name: "Demo Polyclinic", status: "Online", load: 64 },
  { name: "Demo Health Centre", status: "Syncing", load: 47 },
  { name: "Demo Community Clinic", status: "Online", load: 31 },
];

export const patients = [
  { id: "DEMO-10482", name: "A. M.", age: 34, sex: "F", facility: "District Hospital", last: "Today", status: "In consultation" },
  { id: "DEMO-10477", name: "K. O.", age: 52, sex: "M", facility: "Polyclinic", last: "Today", status: "Awaiting lab" },
  { id: "DEMO-10463", name: "E. A.", age: 27, sex: "F", facility: "District Hospital", last: "Yesterday", status: "Discharged" },
  { id: "DEMO-10458", name: "Y. B.", age: 8, sex: "M", facility: "Health Centre", last: "2 days ago", status: "Follow-up due" },
  { id: "DEMO-10441", name: "S. D.", age: 61, sex: "F", facility: "Polyclinic", last: "3 days ago", status: "Discharged" },
  { id: "DEMO-10436", name: "J. K.", age: 45, sex: "M", facility: "Community Clinic", last: "5 days ago", status: "Follow-up due" },
  { id: "DEMO-10422", name: "R. N.", age: 38, sex: "F", facility: "District Hospital", last: "1 week ago", status: "Discharged" },
  { id: "DEMO-10419", name: "P. T.", age: 70, sex: "M", facility: "Health Centre", last: "1 week ago", status: "Discharged" },
];

export const clinicians = ["Clinic Room 1", "Clinic Room 2", "Maternal Health"];

export const appointments = [
  { col: 0, start: 8, dur: 0.5, who: "A. M.", type: "Review", tone: "primary" },
  { col: 0, start: 9, dur: 0.75, who: "K. O.", type: "Consultation", tone: "secondary" },
  { col: 0, start: 10.25, dur: 0.5, who: "J. K.", type: "Follow-up", tone: "primary" },
  { col: 0, start: 12, dur: 1, who: "Team", type: "Ward round", tone: "muted" },
  { col: 0, start: 13.5, dur: 0.5, who: "S. D.", type: "Results", tone: "secondary" },
  { col: 1, start: 8.5, dur: 0.75, who: "P. T.", type: "Consultation", tone: "secondary" },
  { col: 1, start: 9.75, dur: 0.5, who: "R. N.", type: "Review", tone: "primary" },
  { col: 1, start: 11, dur: 0.75, who: "Y. B.", type: "Child welfare", tone: "primary" },
  { col: 1, start: 13, dur: 0.75, who: "M. A.", type: "Consultation", tone: "secondary" },
  { col: 2, start: 8, dur: 1, who: "Clinic", type: "Antenatal session", tone: "muted" },
  { col: 2, start: 9.5, dur: 0.5, who: "E. A.", type: "Antenatal", tone: "primary" },
  { col: 2, start: 10.5, dur: 0.75, who: "G. F.", type: "Postnatal", tone: "secondary" },
  { col: 2, start: 12.5, dur: 0.5, who: "L. Q.", type: "Antenatal", tone: "primary" },
  { col: 2, start: 13.5, dur: 0.75, who: "H. W.", type: "Review", tone: "secondary" },
];

export const attendance = [
  { name: "Attended", value: 286, color: "#17181b" },
  { name: "Upcoming", value: 41, color: "#c9c7c2" },
  { name: "Missed", value: 15, color: "#24429e" },
];

export const monthly = [
  { m: "Jan", visits: 4820, admissions: 610 },
  { m: "Feb", visits: 4510, admissions: 584 },
  { m: "Mar", visits: 5120, admissions: 642 },
  { m: "Apr", visits: 4980, admissions: 655 },
  { m: "May", visits: 5410, admissions: 701 },
  { m: "Jun", visits: 5630, admissions: 724 },
];

export const facilityMix = [
  { name: "Hospital", value: 46, color: "#17181b" },
  { name: "Polyclinic", value: 27, color: "#5d6067" },
  { name: "Health centre", value: 18, color: "#a3a5ab" },
  { name: "Clinic", value: 9, color: "#dedcd7" },
];

export const indicators = [
  { name: "Records completed within 24h", value: 94, target: 90 },
  { name: "Lab results returned on time", value: 87, target: 85 },
  { name: "Appointments kept", value: 84, target: 90 },
  { name: "Reports submitted on schedule", value: 100, target: 95 },
];
