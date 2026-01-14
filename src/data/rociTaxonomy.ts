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
  classes: Class[];
}

export interface Region {
  id: string;
  name: string;
  description: string;
  origins: Origin[];
}

export const rociTaxonomy: Region[] = [
  {
    id: "SVr",
    name: "Supraventricular",
    description: "Impulse originates above the His bundle bifurcation. The ventricles are activated via the normal conduction system.",
    origins: [
      {
        id: "SAn",
        name: "Sinus Node",
        abbreviation: "SAn",
        description: "Impulse originates from the sinoatrial node, the heart's natural pacemaker.",
        classes: [
          {
            id: "regular_automaticity",
            name: "Regular Automaticity",
            description: "Spontaneous, regular depolarization from the SA node.",
            identities: [
              {
                id: "sinus_rhythm",
                name: "Sinus Rhythm",
                abbreviation: "SR",
                icd10: "I49.8",
                definition: "Normal cardiac rhythm originating from the sinoatrial node with regular impulse generation.",
                mechanism: "Spontaneous phase 4 depolarization of SA nodal pacemaker cells at a physiologic rate.",
                ecgFeatures: [
                  "Upright P wave in leads I, II, aVF",
                  "P wave precedes every QRS complex",
                  "Regular RR intervals (CV < 0.10)",
                  "PR interval 120-200ms"
                ],
                rateNote: "Sinus Bradycardia and Sinus Tachycardia are not separate identities. They represent Sinus Rhythm with a bradycardic (<60 bpm) or tachycardic (>100 bpm) rate phenotype from the Intrinsics layer."
              }
            ]
          },
          {
            id: "variable_automaticity",
            name: "Variable Automaticity",
            description: "SA node firing with physiologic variation, often respiratory-linked.",
            identities: [
              {
                id: "sinus_arrhythmia",
                name: "Sinus Arrhythmia",
                abbreviation: "SA",
                icd10: "I49.8",
                definition: "Sinus rhythm with cyclical variation in rate, typically linked to respiration.",
                mechanism: "Vagal tone fluctuations during respiration cause beat-to-beat variation in SA node automaticity.",
                ecgFeatures: [
                  "Normal sinus P wave morphology",
                  "Irregular RR intervals with phasic pattern",
                  "Rate increases with inspiration, decreases with expiration",
                  "PP interval variation > 120ms"
                ]
              }
            ]
          },
          {
            id: "nodal_reentry",
            name: "Nodal Reentry",
            description: "Reentrant circuit involving the SA node and surrounding atrial tissue.",
            identities: [
              {
                id: "sanrt",
                name: "Sinoatrial Nodal Reentrant Tachycardia",
                abbreviation: "SANRT",
                icd10: "I47.1",
                definition: "Paroxysmal tachycardia due to reentry within or around the SA node.",
                mechanism: "Reentrant circuit involving the SA node and perinodal atrial tissue.",
                ecgFeatures: [
                  "P wave morphology identical to sinus P wave",
                  "Abrupt onset and termination",
                  "Rate typically 100-150 bpm",
                  "May be triggered by premature atrial complexes"
                ]
              }
            ]
          },
          {
            id: "automaticity_failure",
            name: "Automaticity Failure",
            description: "Failure of SA node impulse generation.",
            identities: [
              {
                id: "sinus_arrest",
                name: "Sinus Arrest",
                abbreviation: "SARR",
                icd10: "I45.5",
                definition: "Transient failure of SA node impulse formation resulting in absent P waves.",
                mechanism: "SA node fails to generate an impulse, causing a pause not a multiple of the basic PP interval.",
                ecgFeatures: [
                  "Absent P waves during pause",
                  "Pause duration not a multiple of PP interval",
                  "May be followed by escape beat",
                  "Distinguished from SA block by non-multiple pause"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "SAe",
        name: "Atrial (Extranodal)",
        abbreviation: "SAe",
        description: "Impulse originates from atrial tissue outside the SA node.",
        classes: [
          {
            id: "unifocal_automaticity",
            name: "Unifocal Automaticity",
            description: "Single ectopic atrial focus with regular firing.",
            identities: [
              {
                id: "ectopic_atrial_rhythm",
                name: "Ectopic Atrial Rhythm",
                abbreviation: "EAR",
                icd10: "I49.1",
                definition: "Regular rhythm arising from a single atrial focus outside the SA node.",
                mechanism: "Enhanced automaticity of a non-sinus atrial focus that takes over as the dominant pacemaker.",
                ecgFeatures: [
                  "P wave morphology different from sinus",
                  "Regular rhythm",
                  "Rate typically 60-100 bpm",
                  "Abnormal P wave axis depending on focus location"
                ]
              }
            ]
          },
          {
            id: "escape_automaticity",
            name: "Escape Automaticity",
            description: "Atrial focus firing as backup when SA node fails.",
            identities: [
              {
                id: "atrial_escape_rhythm",
                name: "Atrial Escape Rhythm",
                abbreviation: "AER",
                icd10: "I49.1",
                definition: "Subsidiary atrial pacemaker emerges when SA node fails or slows excessively.",
                mechanism: "Latent atrial pacemaker cells with slower intrinsic rate become dominant during SA node suppression.",
                ecgFeatures: [
                  "Non-sinus P wave morphology",
                  "Rate typically 50-60 bpm",
                  "Often preceded by pause",
                  "Regular if sustained"
                ]
              }
            ]
          },
          {
            id: "enhanced_focal_automaticity",
            name: "Enhanced Focal Automaticity",
            description: "Single atrial focus firing at accelerated rate.",
            identities: [
              {
                id: "focal_atrial_tachycardia",
                name: "Focal Atrial Tachycardia",
                abbreviation: "FAT",
                icd10: "I47.1",
                definition: "Tachycardia arising from rapid firing of a single ectopic atrial focus.",
                mechanism: "Enhanced automaticity or triggered activity from a discrete atrial site.",
                ecgFeatures: [
                  "Abnormal P wave morphology (non-sinus)",
                  "Regular atrial rate, typically 150-250 bpm",
                  "Warm-up phenomenon at onset",
                  "May have AV block with continued atrial tachycardia"
                ]
              }
            ]
          },
          {
            id: "multifocal_automaticity",
            name: "Multifocal Automaticity",
            description: "Multiple atrial foci firing irregularly at normal rates.",
            identities: [
              {
                id: "multifocal_atrial_rhythm",
                name: "Multifocal Atrial Rhythm",
                abbreviation: "MAR",
                icd10: "I49.1",
                definition: "Irregular rhythm with multiple atrial pacemaker sites and varying P wave morphology.",
                mechanism: "Multiple atrial foci with varying automaticity compete for dominance.",
                ecgFeatures: [
                  "At least 3 different P wave morphologies",
                  "Irregular PP intervals",
                  "Varying PR intervals",
                  "Rate < 100 bpm"
                ]
              }
            ]
          },
          {
            id: "enhanced_multifocal_automaticity",
            name: "Enhanced Multifocal Automaticity",
            description: "Multiple atrial foci firing at tachycardic rates.",
            identities: [
              {
                id: "multifocal_atrial_tachycardia",
                name: "Multifocal Atrial Tachycardia",
                abbreviation: "MAT",
                icd10: "I47.1",
                definition: "Irregular tachycardia with multiple competing atrial foci.",
                mechanism: "Enhanced automaticity from 3+ atrial sites, often associated with pulmonary disease.",
                ecgFeatures: [
                  "At least 3 different P wave morphologies",
                  "Irregular PP and RR intervals",
                  "Varying PR intervals",
                  "Rate > 100 bpm"
                ]
              }
            ]
          },
          {
            id: "macroreentry_single_circuit",
            name: "Macroreentry (Single Circuit)",
            description: "Large reentrant circuit within the atria with organized activation.",
            identities: [
              {
                id: "atrial_flutter",
                name: "Atrial Flutter",
                abbreviation: "AFL",
                icd10: "I48.92",
                definition: "Organized macroreentrant atrial tachycardia with characteristic sawtooth pattern.",
                mechanism: "Macroreentrant circuit, typically around the tricuspid annulus (cavotricuspid isthmus-dependent).",
                ecgFeatures: [
                  "Sawtooth flutter waves (F waves) in inferior leads",
                  "Atrial rate typically 250-350 bpm",
                  "Regular atrial activity",
                  "Variable AV conduction (2:1, 3:1, 4:1)"
                ]
              }
            ]
          },
          {
            id: "fibrillatory_activation",
            name: "Fibrillatory Activation",
            description: "Chaotic, disorganized atrial electrical activity.",
            identities: [
              {
                id: "atrial_fibrillation",
                name: "Atrial Fibrillation",
                abbreviation: "AF",
                icd10: "I48.91",
                definition: "Chaotic atrial activation with absence of organized atrial contraction.",
                mechanism: "Multiple wavelet reentry and/or rapidly firing foci causing chaotic atrial depolarization.",
                ecgFeatures: [
                  "Absent discrete P waves",
                  "Fibrillatory baseline (f waves)",
                  "Irregularly irregular RR intervals",
                  "Variable ventricular rate"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "AVn",
        name: "AV Junction (Nodal)",
        abbreviation: "AVn",
        description: "Impulse originates from the AV node or proximal His bundle.",
        classes: [
          {
            id: "baseline_automaticity",
            name: "Baseline Automaticity",
            description: "AV junction firing as dominant pacemaker at its intrinsic rate.",
            identities: [
              {
                id: "junctional_rhythm",
                name: "Junctional Rhythm",
                abbreviation: "JR",
                icd10: "I49.2",
                definition: "Regular rhythm arising from the AV junction at its intrinsic rate.",
                mechanism: "AV junctional pacemaker cells assume pacemaker function, typically when SA node fails.",
                ecgFeatures: [
                  "Narrow QRS complexes",
                  "Absent, retrograde, or dissociated P waves",
                  "Rate 40-60 bpm",
                  "Regular rhythm"
                ]
              }
            ]
          },
          {
            id: "escape_automaticity",
            name: "Escape Automaticity",
            description: "AV junction firing as backup pacemaker.",
            identities: [
              {
                id: "junctional_escape_rhythm",
                name: "Junctional Escape Rhythm",
                abbreviation: "JER",
                icd10: "I49.2",
                definition: "Junctional rhythm emerging as escape mechanism during SA node failure or block.",
                mechanism: "Latent junctional pacemaker emerges when higher pacemakers fail.",
                ecgFeatures: [
                  "Narrow QRS",
                  "Rate 40-60 bpm",
                  "Often preceded by pause",
                  "Retrograde P waves may be present"
                ]
              }
            ]
          },
          {
            id: "enhanced_automaticity",
            name: "Enhanced Automaticity",
            description: "AV junction firing faster than its intrinsic rate.",
            identities: [
              {
                id: "accelerated_junctional_rhythm",
                name: "Accelerated Junctional Rhythm",
                abbreviation: "AJR",
                icd10: "I49.2",
                definition: "Junctional rhythm with enhanced automaticity causing faster than normal junctional rate.",
                mechanism: "Enhanced phase 4 depolarization in junctional tissue, often from digitalis toxicity or ischemia.",
                ecgFeatures: [
                  "Narrow QRS",
                  "Rate 60-100 bpm",
                  "AV dissociation common",
                  "Retrograde P waves may be visible"
                ]
              }
            ]
          },
          {
            id: "hyperautomaticity",
            name: "Hyperautomaticity",
            description: "AV junction firing at tachycardic rates.",
            identities: [
              {
                id: "junctional_tachycardia",
                name: "Junctional Tachycardia",
                abbreviation: "JT",
                icd10: "I47.1",
                definition: "Tachycardia arising from enhanced junctional automaticity.",
                mechanism: "Markedly enhanced automaticity of junctional tissue.",
                ecgFeatures: [
                  "Narrow QRS tachycardia",
                  "Rate > 100 bpm",
                  "AV dissociation or 1:1 retrograde conduction",
                  "Warm-up phenomenon at onset"
                ]
              }
            ]
          },
          {
            id: "nodal_reentry_dual_pathway",
            name: "Nodal Reentry (Dual Pathway)",
            description: "Reentry using dual AV nodal pathways.",
            identities: [
              {
                id: "avnrt",
                name: "AV Nodal Reentrant Tachycardia",
                abbreviation: "AVNRT",
                icd10: "I47.1",
                definition: "Paroxysmal SVT due to reentry within the AV node using fast and slow pathways.",
                mechanism: "Reentry circuit using dual AV nodal pathways (fast and slow) with different conduction properties.",
                ecgFeatures: [
                  "Regular narrow complex tachycardia",
                  "Rate typically 150-250 bpm",
                  "P waves buried in QRS or pseudo r' in V1",
                  "Abrupt onset and termination"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "AVe",
        name: "AV Junction (Extranodal)",
        abbreviation: "AVe",
        description: "Impulse involves accessory pathways connecting atria and ventricles.",
        classes: [
          {
            id: "orthodromic_macroreentry",
            name: "Orthodromic Macroreentry",
            description: "Reentry using accessory pathway retrogradely, AV node anterogradely.",
            identities: [
              {
                id: "orthodromic_avrt",
                name: "Orthodromic AVRT",
                abbreviation: "O-AVRT",
                icd10: "I47.1",
                definition: "Reentrant tachycardia conducting antegrade via AV node and retrograde via accessory pathway.",
                mechanism: "Macroreentrant circuit using the AV node-His-Purkinje system for antegrade and accessory pathway for retrograde conduction.",
                ecgFeatures: [
                  "Narrow QRS tachycardia",
                  "Rate 150-250 bpm",
                  "Retrograde P waves in ST segment",
                  "RP interval typically < PR interval"
                ]
              }
            ]
          },
          {
            id: "orthodromic_decremental_reentry",
            name: "Orthodromic Decremental Reentry",
            description: "Reentry using slowly conducting accessory pathway.",
            identities: [
              {
                id: "pjrt",
                name: "Permanent Junctional Reciprocating Tachycardia",
                abbreviation: "PJRT",
                icd10: "I47.1",
                definition: "Incessant SVT using a slowly conducting posteroseptal accessory pathway.",
                mechanism: "Orthodromic reentry using a concealed, decremental accessory pathway with slow retrograde conduction.",
                ecgFeatures: [
                  "Narrow QRS tachycardia",
                  "Long RP interval (RP > PR)",
                  "Deeply inverted P waves in inferior leads",
                  "Incessant nature"
                ]
              }
            ]
          },
          {
            id: "antidromic_macroreentry",
            name: "Antidromic Macroreentry",
            description: "Reentry using accessory pathway anterogradely, AV node retrogradely.",
            identities: [
              {
                id: "antidromic_avrt",
                name: "Antidromic AVRT",
                abbreviation: "A-AVRT",
                icd10: "I47.1",
                definition: "Reentrant tachycardia conducting antegrade via accessory pathway and retrograde via AV node.",
                mechanism: "Macroreentrant circuit using accessory pathway for antegrade and AV node for retrograde conduction.",
                ecgFeatures: [
                  "Wide QRS tachycardia (fully preexcited)",
                  "Rate 150-250 bpm",
                  "QRS morphology reflects accessory pathway location",
                  "Retrograde P waves may be visible"
                ]
              }
            ]
          },
          {
            id: "atriofascicular_reentry",
            name: "Atriofascicular Reentry",
            description: "Reentry using atriofascicular (Mahaim) pathway.",
            identities: [
              {
                id: "mahaim_tachycardia",
                name: "Mahaim Tachycardia",
                abbreviation: "MT",
                icd10: "I47.1",
                definition: "Antidromic tachycardia using an atriofascicular pathway.",
                mechanism: "Reentry using atriofascicular pathway for antegrade conduction with decremental properties.",
                ecgFeatures: [
                  "Wide QRS with LBBB morphology",
                  "Left axis deviation",
                  "Relatively narrow QRS for preexcitation",
                  "Rate 150-250 bpm"
                ]
              }
            ]
          },
          {
            id: "nodofascicular_reentry",
            name: "Nodofascicular Reentry",
            description: "Reentry using nodofascicular pathway.",
            identities: [
              {
                id: "nodofascicular_tachycardia",
                name: "Nodofascicular Tachycardia",
                abbreviation: "NFT",
                icd10: "I47.1",
                definition: "Tachycardia using a pathway connecting the AV node to the fascicles.",
                mechanism: "Reentry involving a nodofascicular pathway with decremental conduction properties.",
                ecgFeatures: [
                  "Wide QRS tachycardia",
                  "LBBB morphology",
                  "AV dissociation or ventriculoatrial block may occur",
                  "Rate typically 150-200 bpm"
                ]
              }
            ]
          },
          {
            id: "nodoventricular_reentry",
            name: "Nodoventricular Reentry",
            description: "Reentry using nodoventricular pathway.",
            identities: [
              {
                id: "nodoventricular_tachycardia",
                name: "Nodoventricular Tachycardia",
                abbreviation: "NVT",
                icd10: "I47.1",
                definition: "Tachycardia using a pathway from AV node to ventricular myocardium.",
                mechanism: "Reentry involving nodoventricular fibers with decremental properties.",
                ecgFeatures: [
                  "Wide QRS tachycardia",
                  "Variable QRS morphology",
                  "May have VA dissociation",
                  "Rate typically 150-200 bpm"
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "Vr",
    name: "Ventricular",
    description: "Impulse originates below the His bundle bifurcation. The ventricles are activated abnormally.",
    origins: [
      {
        id: "Vn",
        name: "Ventricular (Fascicular)",
        abbreviation: "Vn",
        description: "Impulse originates from the specialized conduction system below the His bundle.",
        classes: [
          {
            id: "escape_automaticity",
            name: "Escape Automaticity",
            description: "Ventricular escape pacemaker firing at intrinsic rate.",
            identities: [
              {
                id: "idioventricular_rhythm",
                name: "Idioventricular Rhythm",
                abbreviation: "IVR",
                icd10: "I49.9",
                definition: "Ventricular escape rhythm at the inherent rate of ventricular pacemaker cells.",
                mechanism: "Ventricular pacemaker cells assume dominance when higher pacemakers fail.",
                ecgFeatures: [
                  "Wide QRS complexes (>120ms)",
                  "Rate 20-40 bpm",
                  "Regular rhythm",
                  "AV dissociation"
                ]
              }
            ]
          },
          {
            id: "enhanced_automaticity",
            name: "Enhanced Automaticity",
            description: "Ventricular focus firing faster than escape rate but below tachycardia.",
            identities: [
              {
                id: "aivr",
                name: "Accelerated Idioventricular Rhythm",
                abbreviation: "AIVR",
                icd10: "I49.9",
                definition: "Enhanced ventricular automaticity at rates faster than intrinsic but below VT threshold.",
                mechanism: "Enhanced automaticity of ventricular pacemaker cells, often in reperfusion.",
                ecgFeatures: [
                  "Wide QRS complexes",
                  "Rate 50-120 bpm",
                  "Regular rhythm",
                  "Fusion and capture beats common"
                ]
              }
            ]
          },
          {
            id: "purkinje_triggered_activity",
            name: "Purkinje Triggered Activity",
            description: "Triggered activity from Purkinje fibers.",
            identities: [
              {
                id: "purkinje_triggered_vt",
                name: "Purkinje Triggered VT",
                abbreviation: "PTVT",
                icd10: "I47.2",
                definition: "VT arising from triggered activity in the Purkinje network.",
                mechanism: "Delayed afterdepolarizations in Purkinje fibers trigger repetitive firing.",
                ecgFeatures: [
                  "Relatively narrow QRS for VT",
                  "Often catecholamine-sensitive",
                  "May be pause-dependent",
                  "Monomorphic appearance"
                ]
              }
            ]
          },
          {
            id: "posterior_fascicular_reentry",
            name: "Posterior Fascicular Reentry",
            description: "Reentry involving the left posterior fascicle.",
            identities: [
              {
                id: "lpf_vt",
                name: "Left Posterior Fascicular VT",
                abbreviation: "LPF-VT",
                icd10: "I47.2",
                definition: "Fascicular VT involving reentry in the left posterior fascicle.",
                mechanism: "Reentrant circuit involving the left posterior fascicle and adjacent Purkinje tissue.",
                ecgFeatures: [
                  "RBBB morphology with left axis deviation",
                  "Relatively narrow QRS (120-140ms)",
                  "Verapamil-sensitive",
                  "Rate typically 150-200 bpm"
                ]
              }
            ]
          },
          {
            id: "anterior_fascicular_reentry",
            name: "Anterior Fascicular Reentry",
            description: "Reentry involving the left anterior fascicle.",
            identities: [
              {
                id: "laf_vt",
                name: "Left Anterior Fascicular VT",
                abbreviation: "LAF-VT",
                icd10: "I47.2",
                definition: "Fascicular VT involving reentry in the left anterior fascicle.",
                mechanism: "Reentrant circuit involving the left anterior fascicle.",
                ecgFeatures: [
                  "RBBB morphology with right axis deviation",
                  "Relatively narrow QRS",
                  "Less common than posterior fascicular VT",
                  "Rate typically 150-200 bpm"
                ]
              }
            ]
          },
          {
            id: "septal_fascicular_reentry",
            name: "Septal Fascicular Reentry",
            description: "Reentry involving the upper septal fascicles.",
            identities: [
              {
                id: "upper_septal_vt",
                name: "Upper Septal VT",
                abbreviation: "US-VT",
                icd10: "I47.2",
                definition: "Fascicular VT arising from the upper interventricular septum.",
                mechanism: "Reentry in the upper septal region involving fascicular tissue.",
                ecgFeatures: [
                  "Narrow QRS with BBB morphology",
                  "Superior axis",
                  "May mimic SVT with aberrancy",
                  "Verapamil-sensitive"
                ]
              }
            ]
          },
          {
            id: "bundle_branch_reentry",
            name: "Bundle Branch Reentry",
            description: "Macroreentry using the bundle branches.",
            identities: [
              {
                id: "bbr_vt",
                name: "Bundle Branch Reentrant VT",
                abbreviation: "BBR-VT",
                icd10: "I47.2",
                definition: "VT due to macroreentry using the right and left bundle branches.",
                mechanism: "Macroreentrant circuit using the His-Purkinje system, typically in cardiomyopathy.",
                ecgFeatures: [
                  "Wide QRS with typical LBBB or RBBB morphology",
                  "Rate typically 150-200 bpm",
                  "Associated with structural heart disease",
                  "HV interval during VT equals or exceeds sinus rhythm"
                ]
              }
            ]
          }
        ]
      },
      {
        id: "Ve",
        name: "Ventricular (Myocardial)",
        abbreviation: "Ve",
        description: "Impulse originates from ventricular muscle outside the conduction system.",
        classes: [
          {
            id: "monomorphic_reentry",
            name: "Monomorphic Reentry",
            description: "Stable reentrant circuit in ventricular myocardium.",
            identities: [
              {
                id: "mmvt",
                name: "Monomorphic VT",
                abbreviation: "MMVT",
                icd10: "I47.2",
                definition: "VT with uniform QRS morphology indicating a stable reentrant circuit.",
                mechanism: "Reentry around scar or fixed substrate in ventricular myocardium.",
                ecgFeatures: [
                  "Wide QRS > 120ms",
                  "Rate > 100 bpm",
                  "Uniform beat-to-beat QRS morphology",
                  "AV dissociation common"
                ]
              }
            ]
          },
          {
            id: "outflow_tract_automaticity",
            name: "Outflow Tract Automaticity",
            description: "Focal activity from ventricular outflow tract.",
            identities: [
              {
                id: "rvot_vt",
                name: "RVOT VT",
                abbreviation: "RVOT-VT",
                icd10: "I47.2",
                definition: "VT arising from the right ventricular outflow tract.",
                mechanism: "Triggered activity or automaticity in the RVOT, often catecholamine-mediated.",
                ecgFeatures: [
                  "LBBB morphology with inferior axis",
                  "QRS transition V3-V4",
                  "Catecholamine-sensitive",
                  "Often occurs in structurally normal hearts"
                ]
              }
            ]
          },
          {
            id: "enhanced_ventricular_automaticity",
            name: "Enhanced Ventricular Automaticity",
            description: "Enhanced automaticity from ventricular myocardium.",
            identities: [
              {
                id: "avr",
                name: "Accelerated Ventricular Rhythm",
                abbreviation: "AVR",
                icd10: "I49.9",
                definition: "Enhanced ventricular automaticity at moderately accelerated rates.",
                mechanism: "Enhanced automaticity from myocardial focus, often ischemia-related.",
                ecgFeatures: [
                  "Wide QRS complexes",
                  "Rate typically 60-100 bpm",
                  "Monomorphic appearance",
                  "May have fusion beats"
                ]
              }
            ]
          },
          {
            id: "polymorphic_reentry_or_triggered",
            name: "Polymorphic Reentry/Triggered",
            description: "Unstable VT with varying QRS morphology.",
            identities: [
              {
                id: "pmvt",
                name: "Polymorphic VT",
                abbreviation: "PMVT",
                icd10: "I47.2",
                definition: "VT with continuously varying QRS morphology indicating unstable substrate.",
                mechanism: "Multiple reentrant circuits or triggered activity with shifting wavefronts.",
                ecgFeatures: [
                  "Wide QRS with beat-to-beat morphology variation",
                  "Rate typically > 150 bpm",
                  "May include Torsades de Pointes pattern",
                  "Often degenerates to VF"
                ]
              }
            ]
          },
          {
            id: "macroreentry_extreme_rate",
            name: "Macroreentry (Extreme Rate)",
            description: "Very rapid organized ventricular reentry.",
            identities: [
              {
                id: "ventricular_flutter",
                name: "Ventricular Flutter",
                abbreviation: "VFL",
                icd10: "I49.01",
                definition: "Very rapid, organized ventricular tachyarrhythmia with sinusoidal pattern.",
                mechanism: "Rapid macroreentrant circuit or very fast focal activity in ventricular myocardium.",
                ecgFeatures: [
                  "Sinusoidal pattern without isoelectric baseline",
                  "Rate 250-350 bpm",
                  "Unable to distinguish QRS from T wave",
                  "Often transitions to VF"
                ]
              }
            ]
          },
          {
            id: "fibrillatory_activation_network",
            name: "Fibrillatory Activation",
            description: "Chaotic, disorganized ventricular electrical activity.",
            identities: [
              {
                id: "ventricular_fibrillation",
                name: "Ventricular Fibrillation",
                abbreviation: "VF",
                icd10: "I49.01",
                definition: "Chaotic ventricular depolarization with no effective cardiac output.",
                mechanism: "Multiple wandering reentrant wavelets or complete electrical chaos in ventricular myocardium.",
                ecgFeatures: [
                  "Chaotic irregular waveforms",
                  "No identifiable QRS complexes",
                  "Amplitude varies (coarse vs fine VF)",
                  "No cardiac output - cardiac arrest"
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

export const identityCount = 35;

export const taxonomyRules = {
  traversalOrder: "Region → Origin → Class → Identity",
  identityUniqueness: "Each identity maps to exactly one Region-Origin-Class path",
  noMorphologyOverride: "Morphology never changes Region, Origin, Class, or Identity",
  noRateIdentity: "Rate does not create new identities - rate is an Intrinsic phenotype"
};
