export interface Identity {
  id: string;
  name: string;
  abbreviation: string;
  icd10: string;
  definition: string;
  mechanism: string;
  ecgFeatures: string[];
  rateNote?: string;
}

export interface Class {
  id: string;
  name: string;
  description: string;
  identities: Identity[];
}

export interface Origin {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  isNodal: boolean;
  classes: Class[];
}

export interface Region {
  id: string;
  name: string;
  description: string;
  origins: Origin[];
}

// Complete ROCI Taxonomy - 35 Canonical Identities
// Source: rhythmTaxonomy_plain.txt

export const rociTaxonomy: Region[] = [
  {
    id: "SVr",
    name: "Supraventricular",
    description: "Above the His bundle bifurcation",
    origins: [
      {
        id: "SAn",
        name: "Sinoatrial Nodal",
        abbreviation: "SAn",
        description: "The heart's natural pacemaker",
        isNodal: true,
        classes: [
          {
            id: "regular_automaticity",
            name: "Regular Automaticity",
            description: "Spontaneous, regular depolarization",
            identities: [{
              id: "sinus_rhythm",
              name: "Sinus Rhythm",
              abbreviation: "SR",
              icd10: "I49.8",
              definition: "Normal cardiac rhythm originating from the sinoatrial node.",
              mechanism: "Spontaneous phase 4 depolarization of SA nodal pacemaker cells.",
              ecgFeatures: ["Upright P wave in I, II, aVF", "P wave precedes every QRS", "Regular RR intervals", "PR interval 120-200ms"],
              rateNote: "Sinus Bradycardia and Tachycardia are rate phenotypes from the Intrinsics layer."
            }]
          },
          {
            id: "variable_automaticity",
            name: "Variable Automaticity",
            description: "SA node with physiologic variation",
            identities: [{
              id: "sinus_arrhythmia",
              name: "Sinus Arrhythmia",
              abbreviation: "SinArr",
              icd10: "I49.8",
              definition: "Sinus rhythm with cyclical variation, typically respiratory-linked.",
              mechanism: "Vagal tone fluctuations cause beat-to-beat variation.",
              ecgFeatures: ["Normal sinus P morphology", "Phasic RR variation", "Rate varies with respiration"]
            }]
          },
          {
            id: "nodal_reentry",
            name: "Nodal Reentry",
            description: "Reentry involving the SA node",
            identities: [{
              id: "sanrt",
              name: "Sinoatrial Reentrant Tachycardia",
              abbreviation: "SANRT",
              icd10: "I47.1",
              definition: "Paroxysmal tachycardia due to reentry within the SA node.",
              mechanism: "Reentrant circuit in perinodal atrial tissue.",
              ecgFeatures: ["P wave identical to sinus", "Abrupt onset/termination", "Rate 100-150 bpm"]
            }]
          },
          {
            id: "automaticity_failure",
            name: "Automaticity Failure",
            description: "SA node impulse failure",
            identities: [{
              id: "sinus_arrest",
              name: "Sinus Arrest",
              abbreviation: "SinArr",
              icd10: "I45.5",
              definition: "Transient failure of SA node impulse formation.",
              mechanism: "SA node fails to generate impulse.",
              ecgFeatures: ["Absent P waves during pause", "Pause not multiple of PP", "May trigger escape beat"]
            }]
          }
        ]
      },
      {
        id: "SAe",
        name: "Sinoatrial Extranodal",
        abbreviation: "SAe",
        description: "Atrial tissue outside the SA node",
        isNodal: false,
        classes: [
          {
            id: "unifocal_automaticity",
            name: "Unifocal Automaticity",
            description: "Single ectopic focus",
            identities: [{
              id: "ectopic_atrial_rhythm",
              name: "Ectopic Atrial Rhythm",
              abbreviation: "EAR",
              icd10: "I49.1",
              definition: "Regular rhythm from a single non-sinus atrial focus.",
              mechanism: "Enhanced automaticity of ectopic atrial focus.",
              ecgFeatures: ["Non-sinus P morphology", "Regular rhythm", "Rate 60-100 bpm"]
            }]
          },
          {
            id: "escape_automaticity",
            name: "Escape Automaticity",
            description: "Atrial escape pacemaker",
            identities: [{
              id: "atrial_escape_rhythm",
              name: "Atrial Escape Rhythm",
              abbreviation: "AER",
              icd10: "I49.1",
              definition: "Escape rhythm from atrial tissue when higher pacemakers fail.",
              mechanism: "Latent atrial pacemaker assumes control.",
              ecgFeatures: ["Non-sinus P wave", "Rate 40-60 bpm", "Regular rhythm"]
            }]
          },
          {
            id: "enhanced_focal_automaticity",
            name: "Enhanced Focal Automaticity",
            description: "Accelerated single focus",
            identities: [{
              id: "focal_atrial_tachycardia",
              name: "Focal Atrial Tachycardia",
              abbreviation: "FAT",
              icd10: "I47.1",
              definition: "Tachycardia from rapid firing of an ectopic atrial focus.",
              mechanism: "Enhanced automaticity or triggered activity.",
              ecgFeatures: ["Abnormal P wave", "Rate 150-250 bpm", "Warm-up at onset"]
            }]
          },
          {
            id: "multifocal_automaticity",
            name: "Multifocal Automaticity",
            description: "Multiple competing foci",
            identities: [{
              id: "multifocal_atrial_rhythm",
              name: "Multifocal Atrial Rhythm",
              abbreviation: "MAR",
              icd10: "I49.1",
              definition: "Irregular rhythm with 3+ atrial foci at normal rate.",
              mechanism: "Multiple ectopic foci with wandering pacemaker.",
              ecgFeatures: ["3+ P wave morphologies", "Irregular intervals", "Rate <100 bpm"]
            }]
          },
          {
            id: "enhanced_multifocal_automaticity",
            name: "Enhanced Multifocal Automaticity",
            description: "Accelerated multiple foci",
            identities: [{
              id: "multifocal_atrial_tachycardia",
              name: "Multifocal Atrial Tachycardia",
              abbreviation: "MAT",
              icd10: "I47.1",
              definition: "Irregular tachycardia with 3+ atrial foci.",
              mechanism: "Enhanced automaticity from multiple sites.",
              ecgFeatures: ["3+ P wave morphologies", "Irregular intervals", "Rate >100 bpm"]
            }]
          },
          {
            id: "macroreentry_single_circuit",
            name: "Macroreentry Single Circuit",
            description: "Large reentrant circuit",
            identities: [{
              id: "atrial_flutter",
              name: "Atrial Flutter",
              abbreviation: "AFL",
              icd10: "I48.92",
              definition: "Organized macroreentrant atrial tachycardia.",
              mechanism: "Circuit around tricuspid annulus.",
              ecgFeatures: ["Sawtooth flutter waves", "Atrial rate 250-350", "Variable AV conduction"]
            }]
          },
          {
            id: "fibrillatory_activation",
            name: "Fibrillatory Activation",
            description: "Chaotic atrial activity",
            identities: [{
              id: "atrial_fibrillation",
              name: "Atrial Fibrillation",
              abbreviation: "AF",
              icd10: "I48.91",
              definition: "Chaotic atrial activation without organized contraction.",
              mechanism: "Multiple wavelet reentry or rapid focal firing.",
              ecgFeatures: ["Absent discrete P waves", "Fibrillatory baseline", "Irregularly irregular RR"]
            }]
          }
        ]
      },
      {
        id: "AVn",
        name: "Atrioventricular Nodal",
        abbreviation: "AVn",
        description: "AV junction pacemaker cells",
        isNodal: true,
        classes: [
          {
            id: "baseline_automaticity",
            name: "Baseline Automaticity",
            description: "Intrinsic junctional rate",
            identities: [{
              id: "junctional_rhythm",
              name: "Junctional Rhythm",
              abbreviation: "JR",
              icd10: "I49.2",
              definition: "Regular rhythm from the AV junction.",
              mechanism: "Junctional pacemaker assumes dominance.",
              ecgFeatures: ["Narrow QRS", "Absent/retrograde P", "Rate 40-60 bpm"]
            }]
          },
          {
            id: "escape_automaticity",
            name: "Escape Automaticity",
            description: "Junctional escape pacemaker",
            identities: [{
              id: "junctional_escape_rhythm",
              name: "Junctional Escape Rhythm",
              abbreviation: "JER",
              icd10: "I49.2",
              definition: "Escape rhythm from AV junction when higher pacemakers fail.",
              mechanism: "Latent AV nodal pacemaker assumes control.",
              ecgFeatures: ["Narrow QRS", "Rate 40-60 bpm", "Following pause"]
            }]
          },
          {
            id: "enhanced_automaticity",
            name: "Enhanced Automaticity",
            description: "Accelerated junctional firing",
            identities: [{
              id: "accelerated_junctional",
              name: "Accelerated Junctional Rhythm",
              abbreviation: "AJR",
              icd10: "I49.2",
              definition: "Junctional rhythm faster than intrinsic rate.",
              mechanism: "Enhanced phase 4 depolarization.",
              ecgFeatures: ["Narrow QRS", "Rate 60-100 bpm", "AV dissociation common"]
            }]
          },
          {
            id: "hyperautomaticity",
            name: "Hyperautomaticity",
            description: "Very rapid junctional firing",
            identities: [{
              id: "junctional_tachycardia",
              name: "Junctional Tachycardia",
              abbreviation: "JT",
              icd10: "I47.1",
              definition: "Rapid junctional rhythm, often post-operative.",
              mechanism: "Markedly enhanced automaticity.",
              ecgFeatures: ["Narrow QRS", "Rate >100 bpm", "AV dissociation"]
            }]
          },
          {
            id: "nodal_reentry_dual_pathway",
            name: "Nodal Reentry Dual Pathway",
            description: "Fast/slow pathway circuit",
            identities: [{
              id: "avnrt",
              name: "AV Nodal Reentrant Tachycardia",
              abbreviation: "AVNRT",
              icd10: "I47.1",
              definition: "Reentry using dual AV nodal pathways.",
              mechanism: "Fast and slow pathway circuit.",
              ecgFeatures: ["Narrow QRS", "Rate 150-250 bpm", "Pseudo r' in V1"]
            }]
          }
        ]
      },
      {
        id: "AVe",
        name: "Atrioventricular Extranodal",
        abbreviation: "AVe",
        description: "Bypass tracts connecting atria to ventricles",
        isNodal: false,
        classes: [
          {
            id: "orthodromic_macroreentry",
            name: "Orthodromic Macroreentry",
            description: "Antegrade via AV node, retrograde via AP",
            identities: [{
              id: "orthodromic_avrt",
              name: "Orthodromic AVRT",
              abbreviation: "O-AVRT",
              icd10: "I47.1",
              definition: "Narrow complex tachycardia using accessory pathway retrogradely.",
              mechanism: "AV node down, accessory pathway up.",
              ecgFeatures: ["Narrow QRS", "Rate 150-250 bpm", "Retrograde P in ST"]
            }]
          },
          {
            id: "orthodromic_decremental_reentry",
            name: "Orthodromic Decremental Reentry",
            description: "Slow retrograde AP conduction",
            identities: [{
              id: "pjrt",
              name: "Permanent Junctional Reciprocating Tachycardia",
              abbreviation: "PJRT",
              icd10: "I47.1",
              definition: "Incessant narrow complex tachycardia via decremental AP.",
              mechanism: "Slow retrograde accessory pathway.",
              ecgFeatures: ["Narrow QRS", "Long RP interval", "Incessant"]
            }]
          },
          {
            id: "antidromic_macroreentry",
            name: "Antidromic Macroreentry",
            description: "Antegrade via AP, retrograde via AV node",
            identities: [{
              id: "antidromic_avrt",
              name: "Antidromic AVRT",
              abbreviation: "A-AVRT",
              icd10: "I47.1",
              definition: "Wide complex tachycardia using accessory pathway anterogradely.",
              mechanism: "Accessory pathway down, AV node up.",
              ecgFeatures: ["Wide QRS", "Rate 150-250 bpm", "Delta wave"]
            }]
          },
          {
            id: "atriofascicular_reentry",
            name: "Atriofascicular Reentry",
            description: "Mahaim fiber reentry",
            identities: [{
              id: "mahaim_tachycardia",
              name: "Mahaim Tachycardia",
              abbreviation: "MahVT",
              icd10: "I47.1",
              definition: "Antidromic tachycardia via atriofascicular pathway.",
              mechanism: "Atrium to RBB, retrograde via AV node.",
              ecgFeatures: ["LBBB morphology", "Left axis", "Rate 150-250 bpm"]
            }]
          },
          {
            id: "nodofascicular_reentry",
            name: "Nodofascicular Reentry",
            description: "AV node to fascicle pathway",
            identities: [{
              id: "nodofascicular_tachycardia",
              name: "Nodofascicular Tachycardia",
              abbreviation: "NodFVT",
              icd10: "I47.1",
              definition: "Tachycardia via nodofascicular pathway.",
              mechanism: "AV node to fascicle, retrograde via AV node.",
              ecgFeatures: ["Wide QRS", "LBBB morphology", "Relatively narrow"]
            }]
          },
          {
            id: "nodoventricular_reentry",
            name: "Nodoventricular Reentry",
            description: "AV node to ventricular muscle pathway",
            identities: [{
              id: "nodoventricular_tachycardia",
              name: "Nodoventricular Tachycardia",
              abbreviation: "NodVVT",
              icd10: "I47.1",
              definition: "Tachycardia via nodoventricular pathway.",
              mechanism: "AV node to ventricle, retrograde via AV node.",
              ecgFeatures: ["Wide QRS", "Variable morphology", "AV dissociation possible"]
            }]
          }
        ]
      }
    ]
  },
  {
    id: "Vr",
    name: "Ventricular",
    description: "Below the His bundle bifurcation",
    origins: [
      {
        id: "Vn",
        name: "Ventricular Nodal",
        abbreviation: "Vn",
        description: "His-Purkinje conduction system",
        isNodal: true,
        classes: [
          {
            id: "escape_automaticity",
            name: "Escape Automaticity",
            description: "Ventricular escape pacemaker",
            identities: [{
              id: "idioventricular",
              name: "Idioventricular Rhythm",
              abbreviation: "IVR",
              icd10: "I49.9",
              definition: "Ventricular escape at inherent rate.",
              mechanism: "Ventricular pacemaker dominance.",
              ecgFeatures: ["Wide QRS >120ms", "Rate 20-40 bpm", "AV dissociation"]
            }]
          },
          {
            id: "enhanced_automaticity",
            name: "Enhanced Automaticity",
            description: "Accelerated ventricular focus",
            identities: [{
              id: "aivr",
              name: "Accelerated Idioventricular Rhythm",
              abbreviation: "AIVR",
              icd10: "I49.9",
              definition: "Enhanced ventricular automaticity, often in reperfusion.",
              mechanism: "Enhanced automaticity of ventricular cells.",
              ecgFeatures: ["Wide QRS", "Rate 50-120 bpm", "Fusion beats common"]
            }]
          },
          {
            id: "purkinje_triggered_activity",
            name: "Purkinje Triggered Activity",
            description: "Triggered activity from Purkinje cells",
            identities: [{
              id: "purkinje_triggered_vt",
              name: "Purkinje Triggered VT",
              abbreviation: "PurkVT",
              icd10: "I47.2",
              definition: "VT from triggered activity in Purkinje fibers.",
              mechanism: "Triggered activity, often catecholamine-sensitive.",
              ecgFeatures: ["RBBB or LBBB morphology", "Rate 150-200 bpm", "Exercise-induced"]
            }]
          },
          {
            id: "posterior_fascicular_reentry",
            name: "Posterior Fascicular Reentry",
            description: "Left posterior fascicle circuit",
            identities: [{
              id: "lpf_vt",
              name: "Left Posterior Fascicular VT",
              abbreviation: "LPF-VT",
              icd10: "I47.2",
              definition: "Fascicular VT using left posterior fascicle.",
              mechanism: "Reentry in left posterior fascicle.",
              ecgFeatures: ["RBBB + LAD", "Relatively narrow QRS", "Verapamil-sensitive"]
            }]
          },
          {
            id: "anterior_fascicular_reentry",
            name: "Anterior Fascicular Reentry",
            description: "Left anterior fascicle circuit",
            identities: [{
              id: "laf_vt",
              name: "Left Anterior Fascicular VT",
              abbreviation: "LAF-VT",
              icd10: "I47.2",
              definition: "Fascicular VT using left anterior fascicle.",
              mechanism: "Reentry in left anterior fascicle.",
              ecgFeatures: ["RBBB + RAD", "Relatively narrow QRS", "Less common"]
            }]
          },
          {
            id: "septal_fascicular_reentry",
            name: "Septal Fascicular Reentry",
            description: "Upper septal fascicle circuit",
            identities: [{
              id: "upper_septal_vt",
              name: "Upper Septal VT",
              abbreviation: "USep-VT",
              icd10: "I47.2",
              definition: "Fascicular VT from upper septal region.",
              mechanism: "Reentry in septal fascicles.",
              ecgFeatures: ["Narrow QRS", "Normal or left axis", "Rare"]
            }]
          },
          {
            id: "bundle_branch_reentry",
            name: "Bundle Branch Reentry",
            description: "Reentry via bundle branches",
            identities: [{
              id: "bbr_vt",
              name: "Bundle Branch Reentrant VT",
              abbreviation: "BBR-VT",
              icd10: "I47.2",
              definition: "VT using bundle branches as reentry circuit.",
              mechanism: "Macro-reentry via bundle branches.",
              ecgFeatures: ["Typical BBB morphology", "Rate 150-200 bpm", "Dilated cardiomyopathy"]
            }]
          }
        ]
      },
      {
        id: "Ve",
        name: "Ventricular Extranodal",
        abbreviation: "Ve",
        description: "Ventricular muscle outside conduction system",
        isNodal: false,
        classes: [
          {
            id: "monomorphic_reentry",
            name: "Monomorphic Reentry",
            description: "Stable scar-based circuit",
            identities: [{
              id: "mmvt",
              name: "Monomorphic VT",
              abbreviation: "MMVT",
              icd10: "I47.2",
              definition: "VT with uniform morphology from stable reentry.",
              mechanism: "Scar-based reentrant circuit.",
              ecgFeatures: ["Wide QRS >120ms", "Uniform morphology", "AV dissociation"]
            }]
          },
          {
            id: "outflow_tract_automaticity",
            name: "Outflow Tract Automaticity",
            description: "RVOT focus",
            identities: [{
              id: "rvot_vt",
              name: "RVOT VT",
              abbreviation: "RVOT-VT",
              icd10: "I47.2",
              definition: "VT from right ventricular outflow tract.",
              mechanism: "Triggered activity or automaticity.",
              ecgFeatures: ["LBBB + inferior axis", "Exercise-induced", "Benign prognosis"]
            }]
          },
          {
            id: "enhanced_ventricular_automaticity",
            name: "Enhanced Ventricular Automaticity",
            description: "Accelerated myocardial focus",
            identities: [{
              id: "accelerated_ventricular_rhythm",
              name: "Accelerated Ventricular Rhythm",
              abbreviation: "AVR",
              icd10: "I49.9",
              definition: "Enhanced automaticity from ventricular muscle.",
              mechanism: "Enhanced automaticity, often ischemia-related.",
              ecgFeatures: ["Wide QRS", "Rate 50-100 bpm", "Fusion beats"]
            }]
          },
          {
            id: "polymorphic_reentry_or_triggered",
            name: "Polymorphic Reentry or Triggered",
            description: "Unstable/shifting circuits",
            identities: [{
              id: "pmvt",
              name: "Polymorphic VT",
              abbreviation: "PMVT",
              icd10: "I47.2",
              definition: "VT with varying morphology.",
              mechanism: "Multiple circuits or triggered activity.",
              ecgFeatures: ["Beat-to-beat variation", "Rate >150 bpm", "Often degenerates to VF"]
            }]
          },
          {
            id: "macroreentry_extreme_rate",
            name: "Macroreentry Extreme Rate",
            description: "Very rapid organized VT",
            identities: [{
              id: "ventricular_flutter",
              name: "Ventricular Flutter",
              abbreviation: "VFL",
              icd10: "I49.02",
              definition: "Very rapid ventricular rhythm, sinusoidal appearance.",
              mechanism: "Organized reentry at extreme rate.",
              ecgFeatures: ["Sinusoidal waves", "Rate 250-350 bpm", "Pre-VF"]
            }]
          },
          {
            id: "fibrillatory_activation_network",
            name: "Fibrillatory Activation Network",
            description: "Chaotic ventricular activity",
            identities: [{
              id: "vf",
              name: "Ventricular Fibrillation",
              abbreviation: "VF",
              icd10: "I49.01",
              definition: "Chaotic ventricular depolarization, no cardiac output.",
              mechanism: "Multiple wandering wavelets.",
              ecgFeatures: ["Chaotic waveforms", "No identifiable QRS", "Cardiac arrest"]
            }]
          }
        ]
      }
    ]
  }
];
