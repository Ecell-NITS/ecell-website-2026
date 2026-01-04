export interface CoreMember {
  id: number;
  name: string;
  rank: string;
  image?: string;
  fb?: string;
  linkedln?: string;
  insta?: string;
  git?: string;
}

export type CoreYear =
  | "2025-2026"
  | "2024-2025"
  | "2023-2024"
  | "2022-2023"
  | "2021-2022";

export const coreTeamData: Record<CoreYear, CoreMember[]> = {
  "2025-2026": [
    {
      id: 1,
      name: "Dev Mehrotra ",
      rank: "President ",
      image:
        "https://res.cloudinary.com/ecell/image/upload/v1761760105/IMG_20251029_231705_balae3.jpg",
      fb: "https://m.facebook.com/profile.php?id=100088178675309&name=xhp_nt__fb__action__open_user",
      linkedln: "https://www.linkedin.com/in/dev-mehrotra-3026601b/",
      insta: "https://www.instagram.com/_dev_.mehrotra/",
    },
    {
      id: 2,
      name: "Dev Jaiswal",
      rank: "General Secretary",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748942799/IMG_20250213_230428_-_Dev_da_oyc3nk.jpg",
      fb: "https://www.facebook.com/share/16he2U5dgz/?mibextid=qi2Omg",
      linkedln:
        "https://www.linkedin.com/in/dev-jaiswal-144922253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta:
        "https://www.instagram.com/jaiswal_dev_da20k3?igsh=MWY2cXVoNjZvbHl1dA==",
    },
    {
      id: 3,
      name: "Piyush Agarwal ",
      rank: "General Secretary",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748942809/DSC_0138_1_-_PIYUSH_AGARWAL_bc7dpk.jpg",
      fb: "https://www.facebook.com/share/18pHVEJtcp/",
      linkedln:
        "https://www.linkedin.com/in/agpiyush84?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta:
        "https://www.instagram.com/___piyush_agarwal__?igsh=OXF6MmdwYzVoMHk4",
    },
    {
      id: 4,
      name: "Shreya Agarwal ",
      rank: "Vice President ",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863305/IMG_5565_-_Shreya_Agarwala_fgqdip.jpg",
      fb: "https://www.facebook.com/share/1CKwvcJA9C/?mibextid=wwXIfr",
      linkedln:
        "https://www.linkedin.com/in/shreya-agl?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      insta:
        "https://www.instagram.com/shreya_agl05?igsh=M3QyZDhmZzhoN2w3&utm_source=qr",
    },
    {
      id: 5,
      name: "Mimansa Jain",
      rank: "Executive Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748865274/IMG_3013_1_ufpizp.jpg",
      fb: "https://www.facebook.com/share/1AW552Udy8/?mibextid=wwXIfr",
      linkedln:
        "https://www.linkedin.com/in/mimansa-jain-56349728a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      insta:
        "https://www.instagram.com/_mimansa.13?igsh=MWEzdmpsdnJvNjE1aA%3D%3D&utm_source=qr",
    },
    {
      id: 6,
      name: "Ujjwal Saxena",
      rank: "Executive Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748861605/WhatsApp_Image_2025-06-01_at_12.07.48_AM_-_Ujjwal_Saxena_jy7uju.jpg",
      fb: "https://www.facebook.com/profile.php?id=61551080062709",
      linkedln: "https://www.linkedin.com/in/ujjwal-saxena-2a19922b4/",
      insta: "https://www.instagram.com/ujjwal20043/",
    },
    {
      id: 7,
      name: "Krishna Harlalka",
      rank: "Marketing Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863432/IMG_20250419_191205_-_krishna_qn2re6.jpg",
      fb: "https://www.facebook.com/share/1XtsXVjWZt/",
      linkedln:
        "https://www.linkedin.com/in/krishna-harlalka-532297230?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta:
        "https://www.instagram.com/k.harlalka?utm_source=qr&igsh=cXVjcTBkbXE5Zzlw",
    },
    {
      id: 8,
      name: "Ronak Choudhary ",
      rank: "Marketing Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863492/682da0b618c37fcbf9417541_-_Ronak_Choudhary_wiyw4g.jpg",
      fb: "https://www.facebook.com/share/19kZkZHchy/",
      linkedln:
        "https://www.linkedin.com/in/ronak-choudhary-9a8009285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta:
        "https://www.instagram.com/ronak_choudhary07?igsh=Nm1hc25xM3YyaHgx",
    },
    {
      id: 9,
      name: "Dhruv Mantri",
      rank: "Design Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863478/DhruvMantri_-_Dhruv_Mantri_xokkss.jpg",
      fb: "https://www.facebook.com/profile.php?id=61550045764555",
      linkedln: "https://www.linkedin.com/in/dhruv-mantri-952965266/",
      insta: "https://www.instagram.com/_dhruv.mantri_/",
    },
    {
      id: 11,
      name: "Muskan Bharti",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1739606439/MuskanPhoto_gg4jwc.jpg",
      fb: "https://www.facebook.com/share/1DjR7TgPxb/",
      linkedln: "https://www.linkedin.com/in/muskan-bharti-a7440b28b",
      insta: "https://www.instagram.com/mus__kan_17/",
    },
    {
      id: 12,
      name: "Bishal Das",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1739606459/bishalPhoto_dy5vgq.jpg",
      fb: "https://www.facebook.com/share/1Ai4aUYGHQ/",
      linkedln: "https://www.linkedin.com/in/bishalnits27",
      insta: "https://www.instagram.com/bishalmusic_ac",
    },
    {
      id: 13,
      name: "Ayush Singh",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862713/IMG_20250514_003132_819_-_AYUSH_SINGH_pcjz7y.webp",
      fb: "https://www.facebook.com/share/16Y8vaYaGr/",
      linkedln:
        "https://www.linkedin.com/in/ayush-singh-1b0a8827b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/theayushsingh7?igsh=dGtocDJ1dHJ2MzR0",
    },
    {
      id: 13,
      name: "Premansh Chakraborty ",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862873/Picsart_25-05-15_15-16-20-407_-_Premansh_Chakraborty_dofgsx.jpg",
      fb: "https://www.facebook.com/share/1F97R1Mcwr/",
      linkedln: "https://www.linkedin.com/in/premansh-chakraborty-99b100281",
      insta: "https://www.instagram.com/_premansh?igsh=bm5raHlycjBhdjhn",
    },
    {
      id: 14,
      name: "Samridhi Srivastava ",
      rank: "Content Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862832/IMG_20250601_231628_-_SAMRIDHI_SRIVASTAVA_126_wvpli1.jpg",
      fb: "https://www.facebook.com/share/1Eubyo9oQp/",
      linkedln:
        "https://www.linkedin.com/in/samridhi-srivastava11?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/samm_s01?igsh=MWJrNGEwYjdiYTB0ag==",
    },
    {
      id: 15,
      name: "Khushi Prasad",
      rank: "Content Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862896/WhatsApp_Image_2025-06-01_at_22.32.40_ea92c95e_-_Khushi_Prasad_motzpt.jpg",
      fb: "https://www.facebook.com/share/16LWboi7ka/",
      linkedln:
        "https://www.linkedin.com/in/khushi-prasad-7a7816280?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/khu_shii0305?igsh=c2Z0Z3hlM3Y3ZGN3",
    },
    {
      id: 16,
      name: "Himanjana Saikia",
      rank: "Curation Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862919/InShot_20250601_200613400_-_HIMANJANA_SAIKIA_1_vznlvh.jpg",
      fb: "https://www.facebook.com/share/1CbPBNsd6m/",
      linkedln:
        "https://www.linkedin.com/in/himanjana-saikia-600462231?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/kinda_himmy?igsh=aWsyNnV5b2VoZzJ2",
    },
    {
      id: 16,
      name: "Jayant Prasad",
      rank: "Curation Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862698/IMG_20250602_004906_-_JAYANT_PRASAD_omvt35.jpg",
      fb: "https://www.facebook.com/share/1EhwB2BjHc/",
      linkedln: "https://www.linkedin.com/in/jayant-prasad-a4179b218/",
      insta:
        "https://www.instagram.com/jayantprasadd?igsh=MTlxNmEyZzRteWNwcQ==",
    },
    {
      id: 17,
      name: "Pallavi Prithani ",
      rank: "Event Management Head ",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862741/IMG-20250514-WA0019_2_-_Pallavi_Prithani_ydk6iz.jpg",
      fb: "https://www.facebook.com/share/18SqJSVyP5/",
      linkedln:
        "https://www.linkedin.com/in/pallavi-prithani-29784028a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/pallaviprithani?igsh=enYwMHd4Nzdqb2Rp",
    },
    {
      id: 18,
      name: "Arhan Rahman",
      rank: "Event Management Head ",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748942846/7d1062be-697c-4aa8-a950-100218bd2d34_-_Arhan_Rahman_wxtzlx.jpg",
      fb: "https://www.facebook.com/profile.php?id=61555952810214",
      linkedln: "https://www.linkedin.com/in/arhan-rahman-125125288/",
      insta: "https://www.instagram.com/arrrrhan/",
    },
    {
      id: 20,
      name: "Vishara Sangule",
      rank: "Publicity Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862679/IMG_1042_-_Vishara_Sangule_jgfieo.jpg",
      fb: "https://www.facebook.com/share/16JwBWQgwN/?mibextid=wwXIfr",
      linkedln:
        "https://www.linkedin.com/in/vishara-sangule?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      insta:
        "https://www.instagram.com/_vishara__?igsh=ZHNwcmxoY3cwZ21x&utm_source=qr",
    },
    {
      id: 21,
      name: "Kartika Jauhari ",
      rank: "Publicity Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748942772/IMG-20250603-WA0007_-_Kartika_Jauhari_mfh1yy.jpg",
      fb: "https://www.facebook.com/share/1AiNgS4ctS/",
      linkedln:
        "https://www.linkedin.com/in/kartika-jauhari?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/kartika_jauhari?igsh=eDNieHU3azRjMmti",
    },
    {
      id: 21,
      name: " Hrishikesh Talukdar",
      rank: "Videography Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863331/Picsart_25-06-01_20-36-18-794_-_EIE_090_Hrishikesh_Talukdar_1_hhtfdw.jpg",
      fb: "https://www.facebook.com/share/1JAgHrUREi/",
      linkedln: "https://www.linkedin.com/in/hrishikesh-talukdar-482a02289",
      insta:
        "https://www.instagram.com/hrishikesh_talukdar_1?igsh=bTFsMDcyb3kxcWV0",
    },
    {
      id: 21,
      name: "Gaurav",
      rank: "Videography Head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748942779/IMG_4796_-_Gaurav_kzducj.jpg",
      fb: "",
      linkedln:
        "https://www.linkedin.com/in/gaurav-kumar-85330428b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      insta: "",
    },
    {
      id: 22,
      name: " Aditya Sharma",
      rank: "Collaboration and Outreach head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862843/e_cell_-_ADITYA_SHARMA_kfkdtk.jpg",
      linkedln:
        "https://www.linkedin.com/in/aditya-sharma-1a96912a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      fb: "https://www.facebook.com/share/1AXictZncZ/",
      insta: "https://www.instagram.com/itsadi_2006?igsh=eG9zdHMyY2Z2dTM1",
    },
    {
      id: 23,
      name: "Anish Kumar",
      rank: "Collaboration and Outreach head",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863358/InShot_20250601_194917108_-_Anish_Kumar_y196vv.jpg",
      fb: "https://www.facebook.com/share/1KzYtKhtUm/",
      linkedln:
        "https://www.linkedin.com/in/anish-shrivastava-819866315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta:
        "https://www.instagram.com/anish_shrxivastav?igsh=NzcxMnU2c3FkeXhm",
    },
    {
      id: 24,
      name: "Bijoyeeta Roy",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748864761/20250531_233013_-_EIE_030_Bijoyeeta_Roy_olpnke.jpg",
      fb: "https://www.facebook.com/share/19NNWUM9fG/?mibextid=qi2Omg",
      linkedln: "https://www.linkedin.com/in/bijoyeetaroy",
      insta: "https://www.instagram.com/brishty.x/",
    },
    {
      id: 25,
      name: "Gulista khatun",
      rank: "Senior Technical Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748943466/WhatsApp_Image_2025-06-03_at_15.06.36_23cc0a1d_zlhdtr.jpg",
      fb: "https://www.facebook.com/profile.php?id=61555806877486&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/gulista-khatun-9414b6314/",
      insta:
        "https://www.instagram.com/gulistakhatun_?igsh=MXZwNXBkYmx6Nms5cQ==",
    },
    {
      id: 26,
      name: "Soumya Ranjan Dash",
      rank: "Senior Marketing Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862667/IMG-20250510-WA0179_-_SOUMYA_RANJAN_DASH_billqs.jpg",
      fb: "https://www.facebook.com/profile.php?id=100070926063622",
      linkedln:
        "https://www.linkedin.com/in/soumya-ranjan-dash-12445320b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/_.soumyad_._?igsh=MTk2Y2lqOHN1cmxtcg==",
    },
    {
      id: 27,
      name: "Divyanshi Singh ",
      rank: "Senior Design Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748863318/IMG-20250601-WA0010_-_Divyanshi_Singh_tcrbok.jpg",
      fb: "https://www.facebook.com/share/1ASyr2R4GR/",
      linkedln:
        "https://www.linkedin.com/in/divyanshi-singh-682128290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta:
        "https://www.instagram.com/diivyanshiiii?igsh=MWxpa2l6eDBnMGVsdw==",
    },
    {
      id: 28,
      name: "Koustubh Mishra ",
      rank: "Senior Publicity Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748945619/Photo_from_KoustubhMishra_2314094_-_KOUSTUBH_MISHRA_1_fau1g2.jpg",
      fb: "https://www.facebook.com/profile.php?id=61550954022733&mibextid=ZbWKwL",
      linkedln:
        "https://www.linkedin.com/in/koustubh-mishra-37147728a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/mishra.koustubh?igsh=czAwZnloYXdwejdj",
    },
    {
      id: 29,
      name: "AMAN KUMAR JHA",
      rank: "General Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862858/IMG_20240216_160821_-_AMAN_y6jmsj.jpg",
      fb: "https://www.facebook.com/share/15NDobh7zX/",
      linkedln:
        "https://www.linkedin.com/in/amanxsays?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/amanxsays/",
    },
    {
      id: 30,
      name: "Paarisha Agarwal ",
      rank: "General Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748862660/IMG-20240826-WA0093_-_Paarisha_Agarwal_gccecc.jpg",
      fb: "https://www.facebook.com/share/1AxYQfLcCk/",
      linkedln:
        "https://www.linkedin.com/in/paarisha-agarwal-956845279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/paarishaaaa?igsh=MXZ2MzdheHRlcWRpeA==",
    },
    {
      id: 31,
      name: "Ruchi Singh",
      rank: "General Associate",
      image:
        "https://res.cloudinary.com/dtt4ftdrw/image/upload/v1748942785/1720797562953_-_RUCHI_SINGH_1_kl7dbt.jpg",
      fb: "https://www.facebook.com/ruchi.singh.864201?mibextid=kFxxJD",
      linkedln: "https://www.linkedin.com/in/ruchi-singh-956106291/",
      insta: "https://www.instagram.com/ruchi12007?igsh=ZHFkdHhkMGE5M3Js",
    },
  ],
  "2024-2025": [
    {
      id: 1,
      name: "Arpit Dhankani",
      rank: "President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375265/23-24%20core/IMG_20230209_000433_-_EEB_143_Arpit_1_yk76xm.webp",
      fb: "https://www.facebook.com/arpit.dhankani?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/arpit-dhankani-27238b219/",
      insta: "https://www.instagram.com/evil_soul29/",
    },
    {
      id: 2,
      name: "Aditi Archita Khataniar",
      rank: "General Secretary",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375265/23-24%20core/IMG_20230227_011043_369_-_CSE_185_Aditi_Archita_Khataniar_1_sjuylx.webp",
      fb: "https://www.facebook.com/mumpyyyyyyy?mibextid=ZbWKwL",
      linkedln:
        "https://www.linkedin.com/in/aditi-archita-khataniar-2189a3226 ",
      insta: "https://www.instagram.com/_.kabhi.kabhi.aditiii._/",
    },
    {
      id: 3,
      name: "Somya Kasaudhan ",
      rank: "General Secretary",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375281/23-24%20core/WhatsApp-Image-2023-05-27-at-09.05.18-173_-Somya_Kasaudhan_bfmlfn.webp",
      fb: "https://www.facebook.com/profile.php?id=100076107792266",
      linkedln: "https://www.linkedin.com/in/somya-kasaudhan-365133229/",
      insta: "https://www.instagram.com/_somya02/",
    },
    {
      id: 4,
      name: "Dev Mehrotra ",
      rank: "Vice President ",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/Dev",
      fb: "https://m.facebook.com/profile.php?id=100088178675309&name=xhp_nt__fb__action__open_user",
      linkedln: "https://www.linkedin.com/in/dev-mehrotra-3026601b/",
      insta: "https://www.instagram.com/_dev_.mehrotra/",
    },
    {
      id: 5,
      name: "Dewang Bawri ",
      rank: "Executive Head ",
      image:
        "https://res.cloudinary.com/dddcd0hco/image/upload/v1724554341/IMG-20240512-WA0008_ggemrs.webp",
      fb: "https://www.facebook.com/dewang.bawri?mibextid=ZbWKwL",
      linkedln:
        "https://www.linkedin.com/in/dewang-bawri-37885724a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/dewang_bawri?igsh=MTBpdjY3anN0N2JkMw==",
    },
    {
      id: 6,
      name: "Aalya Jain",
      rank: "Executive Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/aalya",
      fb: "https://www.facebook.com/profile.php?id=100087870020285&mibextid=ZbWKwL",
      linkedln:
        "https://www.linkedin.com/in/aalya-jain-ab1658262?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/itsmeaalya_04?igsh=ZWl3OHkwbmhtdTds",
    },
    {
      id: 7,
      name: "Naman Surana",
      rank: "Marketing Head",
      image:
        "https://res.cloudinary.com/dddcd0hco/image/upload/v1724554812/IMG_20240322_133911758_czco0n.webp",
      fb: "https://www.facebook.com/naman.surana.35",
      linkedln: "https://www.linkedin.com/in/naman-surana-020a86257/",
      insta: "https://www.instagram.com/surana_naman2205/",
    },
    {
      id: 8,
      name: "Jahanavi Mour ",
      rank: "Marketing Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/jahanavi",
      fb: "https://www.facebook.com/jahanavi.mour?mibextid=ZbWKwL",
      linkedln:
        "https://www.linkedin.com/in/jahanavi-mour-9b42b5217?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/_jahanavi_08?igsh=MTdncHY2OTJ6c2sxdQ==",
    },
    {
      id: 9,
      name: "Ayush Kumar",
      rank: "Design Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/AyushK",
      fb: "https://www.facebook.com/profile.php?id=100052931493206",
      linkedln: "https://www.linkedin.com/in/ayush-kumar-a80182315",
      insta:
        "https://www.instagram.com/i__am__ayush03?igsh=MXR2ZHp6ZmI3NzBvNA==",
    },
    {
      id: 10,
      name: "Dev Jaiswal",
      rank: "Design Head",
      image:
        "https://res.cloudinary.com/dddcd0hco/image/upload/v1724554174/WhatsApp_Image_2024-08-19_at_09.19.14_5e3c25ad_yr3f36.webp",
      fb: "https://www.facebook.com/profile.php?id=100087684498951",
      linkedln: "https://www.linkedin.com/in/dev-jaiswal-144922253/",
      insta: "https://www.instagram.com/jaiswal_dev_da20k3/",
    },
    {
      id: 11,
      name: "Sahin Alam",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/sahin",
      fb: "https://www.facebook.com/sahin.alam.9216778?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/sahin-alam-96250324a/",
      insta: "https://www.instagram.com/sahinisboss/",
    },
    {
      id: 12,
      name: "Siddharth Ghosh",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/sid",
      fb: "https://www.facebook.com/profile.php?id=100070117330528",
      linkedln: "https://www.linkedin.com/in/siddharth-ghosh-18ba29251/",
      insta: "https://www.instagram.com/z_maniac_sidd/",
    },
    {
      id: 13,
      name: "Diptangshu Chakraborty ",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/diptangshu",
      fb: "",
      linkedln: "https://www.linkedin.com/in/diptangshu-chakraborty-463b77250/",
      git: "https://github.com/Diptanghsu-DC",
    },
    {
      id: 14,
      name: "Rudraveer Singh ",
      rank: "Content Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/rudraveer",
      fb: "https://www.facebook.com/profile.php?id=100088728744821&name=xhp_nt__fb__action__open_user",
      linkedln:
        "https://www.linkedin.com/in/rudraveer-singh-779214257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      insta: "https://www.instagram.com/sarthaksinghrudra/",
    },
    {
      id: 15,
      name: "Akash kaushik Goswami",
      rank: "Content Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/Akash",
      fb: "https://www.facebook.com/profile.php?id=100087624175100",
      linkedln: "https://www.linkedin.com/in/akash-kaushik-goswami-11237b282/",
      insta: "",
    },
    {
      id: 16,
      name: "Jahnabi Priyam Das ",
      rank: "Curation Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/jahnabi",
      fb: "https://www.facebook.com/profile.php?id=100087908259469",
      linkedln: "https://www.linkedin.com/in/jahnabi-priyam-das-8aa088253",
      insta: "https://www.instagram.com/jahnabi_priyam?r=nametag",
    },
    {
      id: 17,
      name: "Vishal Singh Patel ",
      rank: "Event Management Head ",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/vishal",
      fb: "https://www.facebook.com/vishalsingh.patel.52493?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/vishal-singh-patel-501863257?",
      insta: "https://www.instagram.com/vishal91145?igsh=MTJ5ZXFrcGJ2d2M2dA==",
    },
    {
      id: 18,
      name: "Saurabh khutela ",
      rank: "Event Management Head ",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/saurabh",
      fb: "https://www.facebook.com/profile.php?id=100014413447295&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/mwlite/in/saurabh-khutela-0866b7213",
      insta: "https://www.instagram.com/saurabh20__71/",
    },
    {
      id: 19,
      name: "Piyush Agarwal ",
      rank: "Event Management Head ",
      image:
        "https://res.cloudinary.com/dddcd0hco/image/upload/v1724554952/IMG_20240315_201727404_HDR2_dzaejn.webp",
      fb: "https://www.facebook.com/profile.php?id=100041958069163&mibextid=ZbWKwL",
      linkedln: "",
      insta: "https://www.instagram.com/___piyush_agarwal__/",
    },
    {
      id: 20,
      name: "Md Arifuzzaman",
      rank: "Publicity Head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/arif",
      fb: "https://www.facebook.com/arif.escaped",
      linkedln: "https://www.linkedin.com/in/arif481",
      insta: "https://www.instagram.com/arif.escaped",
    },
    {
      id: 21,
      name: "Himanshu Rajput ",
      rank: "Publicity Head",
      image:
        "https://res.cloudinary.com/dddcd0hco/image/upload/v1724554578/WhatsApp_Image_2024-08-19_at_10.59.36_03a9561d_ltpn5h.webp",
      fb: "https://www.facebook.com/profile.php?id=100027108048911&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/himanshu-rajput-a2317a258",
      insta: "https://www.instagram.com/him_x_raj?igsh=MWNiMjZ1bmc4YnQ2",
    },
    {
      id: 22,
      name: "Jassi Laskar ",
      rank: "Collaboration and Outreach head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/jassi",
      fb: "https://www.facebook.com/profile.php?id=100087954885869",
      linkedln: "https://www.linkedin.com/in/jassi-laskar-6aba78221",
      insta: "https://www.instagram.com/jassi._l?igsh=MXdpY3Vta2g2OGo2aA==",
    },
    {
      id: 23,
      name: "Partha Das",
      rank: "Collaboration and Outreach head",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/partha",
      fb: "https://www.facebook.com/profile.php?id=100011010306245&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/partha-das-ba1631249",
      insta: "https://instagram.com/last_days3",
    },
    {
      id: 24,
      name: "Bedanta Kataki",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/bedanta",
      fb: "https://m.facebook.com/profile.php/?id=100029303175539&name=xhp_nt__fb__action__open_user",
      linkedln: "https://www.linkedin.com/in/bedanta-kataki-0b5205257/",
      git: "https://www.github.com/r4inr3aper/",
    },
    {
      id: 25,
      name: "Dheeraj Das",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/dhiraj",
      fb: "https://www.facebook.com/dheeraj.das.7165",
      git: "https://github.com/dheeraj1922d",
      insta: "https://www.instagram.com/dheerajdas19/",
    },
    {
      id: 26,
      name: "Deepti Newar ",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/deepti",
      fb: "https://www.facebook.com/profile.php?id=100070646074538&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/deepti-newar-84550428a",
      insta:
        "https://www.instagram.com/invites/contact/?i=674jit09b2eu&utm_content=hlmbth9",
    },
    {
      id: 27,
      name: "Khusbu Kumari",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/khusbu",
      fb: "https://www.facebook.com/profile.php?id=100087627978569",
      linkedln: "https://www.linkedin.com/in/khusbu-kumari-3a404b24b",
      insta: "https://www.instagram.com/khush.bu.18?igsh=NzJxYmlpemticHJp",
    },
    {
      id: 28,
      name: "Yash Singh ",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/yash",
      fb: "https://www.facebook.com/profile.php?id=100041109863011&mibextid=LQQJ4d",
      linkedln: "http://linkedin.com/in/yash-singh-tomar-76318b267",
      insta:
        "https://www.instagram.com/yashsinghtomar_?igsh=OHdkemI3OXgzazds&utm_source=qr",
    },
    {
      id: 29,
      name: "Vishal Sahu",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/vishalsahu",
      fb: "https://www.facebook.com/profile.php?id=100009971225762&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/vishal-sahu-b11345201",
      insta:
        "https://www.instagram.com/_vishal___________?igsh=MXFka3Rqb3hyOHRueg==",
    },
    {
      id: 30,
      name: "Suraj Gupta",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/SurajG",
      fb: "https://www.facebook.com/profile.php?id=100089201604204",
      linkedln: "https://www.linkedin.com/in/suraj-gupta-427321250/",
      insta: "https://www.instagram.com/suraj_gupta407/",
    },
    {
      id: 31,
      name: "Sahir Ahmed",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/ecell/image/upload/f_auto,q_auto/v1/Team/AY%2024-25/sahir",
      fb: "https://www.facebook.com/monster.damn.54?mibextid=LQQJ4d",
      linkedln: "https://www.linkedin.com/in/sahir-ahmed-5398a2256",
    },
  ],
  "2023-2024": [
    {
      id: 1,
      name: "Shriyal Tandon",
      rank: "President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375276/23-24%20core/IMG_1502_-_E-Cell_NIT_Silchar_bn00rj.webp",
      fb: "https://www.facebook.com/shriyal.tandon.7?mibextid=LQQJ4d",
      linkedln: "https://www.linkedin.com/in/shriyal-tandon-39717b200",
      git: "https://github.com/shriyal22",
    },
    {
      id: 13,
      name: "Mrinal kalita ",
      rank: "General Secretary ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375264/23-24%20core/IMG_Mon_May_08_14_10_52_GMT05_30_2023_-_ECE-A027_MRINAL_KALITA_izmoqr.webp",
      fb: "https://www.facebook.com/mrinal.kalita.549436",
      linkedln: "http://linkedin.com/in/mrinal-kalita-281190217",
      git: "https://github.com/mrinalpy20",
    },
    {
      id: 2,
      name: "Arpit Dhankani",
      rank: "Vice President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375265/23-24%20core/IMG_20230209_000433_-_EEB_143_Arpit_1_yk76xm.webp",
      fb: "https://www.facebook.com/arpit.dhankani?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/arpit-dhankani-27238b219/",
      git: "https://github.com/ArpitDhankani",
    },
    {
      id: 3,
      name: "Chayan Gulgulia",
      rank: "Executive Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375273/23-24%20core/IMG_5310-min_-_CE_131_Chayan_Gulgulia_1_lcfy8e.webp",
      fb: "https://www.facebook.com/karya.jain.3/",
      linkedln: "https://www.linkedin.com/in/chayan-gulgulia/",
      git: "https://github.com/chayanjn24",
    },
    {
      id: 4,
      name: "Aditi Archita Khataniar ",
      rank: "Executive Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375265/23-24%20core/IMG_20230227_011043_369_-_CSE_185_Aditi_Archita_Khataniar_1_sjuylx.webp",
      fb: "https://www.facebook.com/mumpyyyyyyy?mibextid=ZbWKwL",
      linkedln:
        "https://www.linkedin.com/in/aditi-archita-khataniar-2189a3226 ",
      git: "https://github.com/adzzzzzzzz",
    },

    {
      id: 6,
      name: "Aditya Kumar",
      rank: "Technical Co-Head",
      image:
        "https://res.cloudinary.com/dnvhl9pru/image/upload/v1681064509/proflie-picpng_2-removebg-preview_qeckz9.webp",
      fb: "https://www.facebook.com/profile.php?id=100071791456601&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/adityakr31",
      git: "https://github.com/31adityakumar",
    },
    {
      id: 27,
      name: "Maharnav Deka",
      rank: "Technical Co-Head",
      image:
        "https://res.cloudinary.com/duejpnj1y/image/upload/v1679413749/Juniordev/Maharnav_Deka_x5edso.webp",
      fb: "https://www.facebook.com/profile.php?id=100076295825121",
      linkedln: "https://www.linkedin.com/in/maharnav-deka-06742815a/",
      git: "https://github.com/mdekaa",
    },
    {
      id: 11,
      name: "Vidhi Shrimali ",
      rank: "Content Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375287/23-24%20core/IMG_20220629_190742_-_CE050_Vidhi_Shrimali_1_lnovlx.webp",
      fb: "https://www.facebook.com/profile.php?id=100076114603753&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/vidhi-shrimali-87164422b",
      git: "#",
    },
    {
      id: 12,
      name: "Uttirna Talukdar ",
      rank: "Content Co-Head ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685376231/23-24%20core/IMG_20230410_212104_480_-_ECE_144_Uttirna_Talukdar_1_magstj.webp",
      fb: "https://www.facebook.com/uttirna.talukdar?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/uttirna-talukdar/",
      git: "https://github.com/Uttirna14",
    },

    {
      id: 7,
      name: "Amrita Kashyap",
      rank: "Design Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685376231/23-24%20core/20220711_023231_204_-_ECE_016_Amrita_Kashyap_1_1_vf3gxe.webp",
      fb: "https://www.facebook.com/profile.php?id=100076495782914&sk=about_overview",
      linkedln: "https://www.linkedin.com/in/amrita-kashyap-a33069230",
      git: "https://github.com/amrita7734",
    },
    {
      id: 8,
      name: "Ashutosh Ojha",
      rank: "Design Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375277/23-24%20core/Ashutosh_-_EEB_121_Ashutosh_ebhxkb.webp",
      fb: "https://www.facebook.com/profile.php?id=100073385629944",
      linkedln: "https://www.linkedin.com/in/ashutosh-ojha-850353227",
      git: "https://github.com/ashutoshkr7070",
    },

    {
      id: 9,
      name: "Rituraj Gautam",
      rank: "Collaboration & Outreach Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375264/23-24%20core/IMG_20230524_000513_-_Rituraj_xap1sh.webp",
      fb: "https://www.facebook.com/thisisrg/",
      linkedln: "https://www.linkedin.com/in/riturajgautam/",
      git: "https://github.com/yourgitcoder",
    },
    {
      id: 10,
      name: "Priyajit Paul",
      rank: "Collaboration & Outreach Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375280/23-24%20core/WhatsApp-Image-2023-05-24-at-10.44.39-PM-14_Priyajit-_Paul_tp7p1u.webp",
      fb: "https://www.facebook.com/priyajit.paul.75",
      linkedln: "https://www.linkedin.com/in/priyajit-paul-4b4840213/",
      git: "https://github.com/Priyajit27",
    },
    {
      id: 27,
      name: "Protoy Debroy",
      rank: "Marketing Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685605007/WhatsApp-Image-2023-05-30-at-19.42.42-ECE_064-Protoy-Debroy_heer3b.webp",
      fb: "https://www.facebook.com/profile.php?id=100076149041275",
      linkedln: "https://www.linkedin.com/in/protoy-debroy-593561256/",
      git: "https://github.com/protoy2003debroy",
    },

    {
      id: 14,
      name: "Vedant Agarwal ",
      rank: "Event Management Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375263/23-24%20core/Screenshot_20230524_230007_-_CSE_128_Vedant_sxtc05.webp",
      fb: "https://www.facebook.com/vedant.agarwal.14811",
      linkedln: "https://www.linkedin.com/in/vedant-agarwal-30984222b/",
      git: "https://github.com/VAO2",
    },
    {
      id: 15,
      name: "Somya Kasaudhan ",
      rank: "Event Management Co-Head ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375281/23-24%20core/WhatsApp-Image-2023-05-27-at-09.05.18-173_-Somya_Kasaudhan_bfmlfn.webp",
      fb: "https://www.facebook.com/profile.php?id=100076107792266",
      linkedln: "https://www.linkedin.com/in/somya-kasaudhan-365133229/",
      git: "https://github.com/somyakasaudhan02",
    },
    {
      id: 16,
      name: "Ankit Upadhaya ",
      rank: "Curation Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375264/23-24%20core/IMG_20230526_101749_-_EI087_Ankit_Upadhaya_aourw8.webp",
      fb: "https://www.facebook.com/profile.php?id=100004528696175&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/ankit-upadhaya07",
      git: "http://github.com/ankit07an",
    },

    {
      id: 17,
      name: "Abhishek Kumar Prasad ",
      rank: "Publicity Co-head",
      image:
        "https://res.cloudinary.com/dp92qug2f/image/upload/v1706813215/abhishek_uh3gaq.webp",
      fb: "https://www.facebook.com/profile.php?id=100010634221532",
      linkedln: "https://www.linkedin.com/in/abhishek-kumar-prasad-b2220424b",
      git: "#",
    },
    {
      id: 18,
      name: "Amlan Mohapatra",
      rank: "Publicity Co-head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375263/23-24%20core/profile_pic_-_32_Amlan__Mohapatra_jtqkow.webp",
      fb: "https://www.facebook.com/amlan.mohapatra2003",
      linkedln: "https://www.linkedin.com/in/amlan-mohapatra/",
      git: "https://github.com/Amlan-Mohapatra-247",
    },
    {
      id: 19,
      name: "Jacinth Mahanta",
      rank: "General Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375281/23-24%20core/Pic-ECE_182_Jacinth-Mahanta_nypvrq.webp",
      fb: "https://www.facebook.com/jacinth.mahanta",
      linkedln: "https://www.linkedin.com/in/jacinth-mahanta-63b279229/",
      git: "https://github.com/Jacinth-Mahanta",
    },
    {
      id: 20,
      name: "Dipali Garg",
      rank: "General Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375264/23-24%20core/IMG_20230526_185122_-_CE078_Dipali_Garg_tviwig.webp",
      fb: "https://www.facebook.com/profile.php?id=100076291058104&mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/dipali-garg-7119ba228",
      git: "#",
    },
    {
      id: 21,
      name: "Bipangshu Saha",
      rank: "General Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375276/23-24%20core/Bipangshu_Saha_-_67_Bipangshu_Saha_la3j0c.webp",
      fb: "https://www.facebook.com/ronny.kumar.7186896/",
      linkedln: "https://www.linkedin.com/in/bipangshu-saha-2aab9b228/",
      git: "https://github.com/BIPS8812",
    },

    {
      id: 22,
      name: "Devanshu Singh",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375268/23-24%20core/Devanshu_Singh_-_EE_126_Devanshu_t0ht30.webp",
      fb: "https://www.facebook.com/profile.php?id=100009443903285",
      linkedln: "https://www.linkedin.com/in/devanshu-singh-541622242/",
      git: "https://github.com/devanshusingh76",
    },
    {
      id: 23,
      name: "Adarsh Kumar",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375276/23-24%20core/IMG_20220617_232515_0817_-_CSE_187_Adarsh_rhmust.webp",
      fb: "https://www.facebook.com/adarsh.yousant.7?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/adarsh-kumar-b6b868224",
      git: "https://github.com/yousant",
    },
    {
      id: 24,
      name: "Vivek kumar",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375263/23-24%20core/WhatsApp_Image_2023-05-06_at_7.27.29_PM_1_-_EEB_096_Vivek_1_ax7zkr.webp",
      fb: "https://www.facebook.com/profile.php?id=100075873505564",
      linkedln: "http://www.linkedin.com/in/vivek-kumar-69086119b",
      git: "https://github.com/vivekumar096",
    },
    {
      id: 25,
      name: "Tanishq Keshari",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375274/23-24%20core/IMG_20230526_114624_-_EI069_Tanishq_Keshari_rxqte1.webp",
      fb: "https://www.facebook.com/profile.php?id=100005469919478",
      linkedln: "https://www.linkedin.com/in/tanishq-keshari-838645228/",
      git: "#",
    },
    {
      id: 26,
      name: "Vansh Kumar Poddar",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685375264/23-24%20core/IMG-20220911-WA0021_-_ECE_156_Vansh_Kumar_Poddar_jymldz.webp",
      fb: "https://www.facebook.com/profile.php?id=100073130336199",
      linkedln: "https://in.linkedin.com/in/vanshkumarpoddar",
      git: "https://github.com/Vansh156",
    },
    {
      id: 28,
      name: "Bikash Baruah",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685605007/picture-ECE_093_Bikash_ytxjmx.webp",
      fb: "https://www.facebook.com/bikash.baruah.23/",
      linkedln: "https://www.linkedin.com/in/bikash-baruah-89426a231/",
      git: "https://github.com/Bikashxb",
    },
  ],
  "2022-2023": [
    {
      id: 1,
      name: "Shriti Mishra",
      rank: "President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524896/webp%20pics/Shriti_1_1_lkzbns.webp",
      fb: "https://www.facebook.com/shriti.mishra.33",
      linkedln: "https://www.linkedin.com/in/shriti-mishra-m15",
      git: "#",
    },
    {
      id: 2,
      name: "Mayur Mulchandani",
      rank: "Vice President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524902/webp%20pics/Mayur_DP_ouruo5.webp",
      fb: "https://www.facebook.com/profile.php?id=100009396306613",
      linkedln: "https://www.linkedin.com/in/mayur-mulchandani-898973198",
      git: "#",
    },
    {
      id: 3,
      name: "Swaraj Pal Kesari",
      rank: "Executive Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524895/webp%20pics/Swaraj_1_wtvmmr.webp",
      fb: "https://www.facebook.com/swarajpalkesari/",
      linkedln: "https://www.linkedin.com/in/swaraj-pal-kesari-4b39311b3/",
      git: "",
    },
    {
      id: 4,
      name: "Manav Sanghi ",
      rank: "Executive Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524904/webp%20pics/manav_yewuao.webp",
      fb: "https://www.facebook.com/manav.sanghi",
      linkedln: "https://www.linkedin.com/in/manav-sanghi-3a355b198 ",
      git: "",
    },
    {
      id: 5,
      name: "Aadi Verma",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524905/webp%20pics/aadiverma_xp5l4k.webp",
      fb: "https://www.facebook.com/aadi.verma.96780671",
      linkedln: "https://www.linkedin.com/in/aadi-verma-429453199",
      git: "",
    },

    {
      id: 6,
      name: "Debanga Choudhury",
      rank: "Design Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/a_90/v1680524904/webp%20pics/Debanga_Choudhury_y1f9si.webp",
      fb: "https://www.facebook.com/debanga.choudhury",
      linkedln: "https://www.linkedin.com/in/debanga-choudhury-3b6b131b6",
      git: "#",
    },
    {
      id: 7,
      name: "Sohan Paul",
      rank: "Design Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524896/webp%20pics/SohanPaul_bocovm.webp",
      fb: "https://www.facebook.com/paulsohan2",
      linkedln: "https://www.linkedin.com/in/sohan-paul/",
      git: "#",
    },

    {
      id: 8,
      name: "Teresa Louis",
      rank: "Collaboration & Outreach Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680526241/webp%20pics/Teresa_qautwy.webp",
      fb: "https://www.facebook.com/teresa.louis1",
      linkedln: "https://www.linkedin.com/in/teresa-louis",
      git: "#",
    },
    {
      id: 9,
      name: "Nihar Jyoti Basistha",
      rank: "Collaboration & Outreach Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680526356/webp%20pics/Nihar_cn29nz.webp",
      fb: "https://www.facebook.com/nihar.basisth.7",
      linkedln: "https://www.linkedin.com/in/nihar-jyoti-basisth-121b2319b",
      git: "#",
    },
    {
      id: 10,
      name: "Tejaswini AVSV",
      rank: "Content Co-Heads",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524895/webp%20pics/Tejaswini_AVSV_jpvcqx.webp",
      fb: "https://www.facebook.com/Tejaswini.AVSV",
      linkedln: "https://www.linkedin.com/in/tejaswiniavsv/",
      git: "#",
    },
    {
      id: 11,
      name: "Sai Lahari",
      rank: "Content Co-Heads ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524897/webp%20pics/Sai_Lahari_1_x5lqrq.webp",
      fb: "https://www.facebook.com/profile.php?id=100006209748653",
      linkedln:
        "https://www.linkedin.com/in/sai-lahari-jayareddygari-57681a196",
      git: "#",
    },
    {
      id: 12,
      name: "Abhishek Bharadwaz",
      rank: "Event Management Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680526500/webp%20pics/Abhishek_fzenfw.webp",
      fb: "https://www.facebook.com/bharadwaz.abhishek",
      linkedln: "https://www.linkedin.com/in/abhishek-bharadwaz-458993192",
      git: "#",
    },
    {
      id: 13,
      name: "Abhinav Kumar Gupta",
      rank: "Event Management Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524905/webp%20pics/Abhinav_e3bjol.webp",
      fb: "https://www.facebook.com/profile.php?id=100003660467689",
      linkedln: "#",
      git: "#",
    },
    {
      id: 14,
      name: "Amalendu Kumar",
      rank: "Marketing & Publicity Co-Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680526726/webp%20pics/Amalendu_cdnskr.webp",
      fb: "https://www.facebook.com/amalenduKumarSingh",
      linkedln: "https://www.linkedin.com/in/amalendu-singh-9b4a99195",
      git: "#",
    },
    {
      id: 15,
      name: "Hemdutt Mishra",
      rank: "Marketing & Publicity Co-Heads",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524903/webp%20pics/Hemdutt_Mishra__aou0pn.webp",
      fb: "https://www.facebook.com/profile.php?id=100037969845038",
      linkedln: "https://www.linkedin.com/in/hem-dutt-mishra-2bbb4a1b5",
      git: "#",
    },
    {
      id: 16,
      name: "Arkadeep Kashyap",
      rank: "Trading Club Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680527017/webp%20pics/Arkadeep_b7au3y.jpg",
      fb: "https://www.facebook.com/arko.kashyap",
      linkedln: "https://www.linkedin.com/in/kashyaparka",
      git: "#",
    },
  ],
  "2021-2022": [
    {
      id: 1,
      name: "Mayur Mulchandani",
      rank: "President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524902/webp%20pics/Mayur_DP_ouruo5.webp",
      fb: "https://www.facebook.com/profile.php?id=100009396306613",
      linkedln: "https://www.linkedin.com/in/mayur-mulchandani-898973198",
      git: "",
    },
    {
      id: 2,
      name: "Shriyal Tandon",
      rank: "Vice President",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524898/webp%20pics/shriyal_1_kymdhu.webp",
      fb: "https://www.facebook.com/shriyal.tandon.7?mibextid=LQQJ4d",
      linkedln: "https://www.linkedin.com/in/shriyal-tandon-39717b200",
      git: "https://github.com/shriyal22",
    },
    {
      id: 17,
      name: "Sakshi Garg",
      rank: "Convenor & Curation Head",
      image:
        "https://res.cloudinary.com/dnvhl9pru/image/upload/v1685774397/sakshi_el0nlh.jpg",
      fb: "https://www.facebook.com/people/Sakshi-Agarwal/100009843640334/?paipv=0&eav=AfZIU6qorLfdsJDbGVgZsj2WrlBScMbg-3ShUXDMiRNd_GszaLnxPWJRmln_ul_YRV8&_rdr",
      linkedln: "https://www.linkedin.com/in/sakshi-garg-95563a215/",
      git: "https://github.com/Sakshiagarwaal",
    },
    {
      id: 3,
      name: "Manash Pratim Pathak ",
      rank: "Technical Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524903/webp%20pics/manash_o1d7dz.webp",
      fb: "https://www.facebook.com/manashpratim.pathak.73",
      linkedln: "https://www.linkedin.com/in/manash-pratim-pathak-6039b81b6/",
      git: "https://github.com/ManashPratimPathak",
    },

    {
      id: 4,
      name: "Kavya Sharma",
      rank: "Design Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680525266/webp%20pics/kavya_1_ffdcbu.webp",
      fb: "https://www.facebook.com/profile.php?id=100008131120392",
      linkedln: "https://www.linkedin.com/in/kavya-sharma-b143651ba/",
      git: "https://github.com/deviill007",
    },
    {
      id: 5,
      name: "Kiran Sarmah",
      rank: "Content Team Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/a_90/v1680525401/webp%20pics/kiran_v9u8kx.webp",
      fb: "https://www.facebook.com/kiran.sarmah.16",
      linkedln: "https://www.linkedin.com/in/kiran-sarmah-510aa9223",
      git: "",
    },
    {
      id: 6,
      name: "Mainur Islam Ahmed ",
      rank: "Publicity and Outreach Head ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524904/webp%20pics/mainur_2_cmhyii.webp",
      fb: "https://www.facebook.com/mainurislam.ahmed?mibextid=ZbWKwL",
      linkedln: "https://www.linkedin.com/in/mainur-islam-ahmed-613ab21ba",
      git: "https://github.com/MAINUR2001",
    },
    {
      id: 7,
      name: "Mrinal Kalita ",
      rank: "Marketing Head",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524902/webp%20pics/mrinal_1_ipau5n.webp",
      fb: "https://www.facebook.com/mrinal.kalita.549436",
      linkedln: "http://linkedin.com/in/mrinal-kalita-281190217",
      git: "",
    },
    {
      id: 8,
      name: "Rishi Kant",
      rank: "Executive Member",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524905/webp%20pics/rishi-kant-_1__xkywsk.webp",
      fb: "https://www.facebook.com/rishikant2808/",
      linkedln: "https://www.linkedin.com/in/rishikant2808/",
      git: "",
    },
    {
      id: 9,
      name: "Prithvi Raj",
      rank: "Executive Member",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524901/webp%20pics/prithvi_1_es2n2n.webp",
      fb: "https://www.facebook.com/ignou13/",
      linkedln: "https://www.linkedin.com/in/prithvi-raj-0b93621b3/",
      git: "https://github.com/InsouciantPrithvi",
    },
    {
      id: 10,
      name: "Kurumoju Deepak",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680525832/webp%20pics/deepak_1_gli1yq.webp",
      fb: "https://www.facebook.com/kurumojudeepak",
      linkedln: "https://www.linkedin.com/in/kurumoju-deepak-29bb8220a/",
      git: "https://github.com/deepu161102",
    },
    {
      id: 11,
      name: "Sanchita Singh",
      rank: "Executive Member ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524899/webp%20pics/sanchita_1_keuxgz.webp",
      fb: "https://www.facebook.com/sanchita.singh.77582359",
      linkedln: "https://www.linkedin.com/in/singhsanchita2008",
      git: "",
    },
    {
      id: 12,
      name: "Eisha Halder ",
      rank: "Executive Member ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524904/webp%20pics/eisha_2_lu5qi4.webp",
      fb: "https://www.facebook.com/eisha.halder.16",
      linkedln: "https://www.linkedin.com/in/eisha-halder-a42367200",
      git: "https://github.com/EishaH",
    },
    {
      id: 13,
      name: "Doneela Das",
      rank: "Senior Technical Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524901/webp%20pics/doneela_1_gpriyh.webp",
      fb: "https://www.facebook.com/doneela.das.71",
      linkedln: "https://www.linkedin.com/in/ddas7",
      git: "https://github.com/doneela",
    },
    {
      id: 14,
      name: "Ankit Srivastava",
      rank: "Senior Associate ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524905/webp%20pics/ankit_1_g4gyze.webp",
      fb: "https://www.facebook.com/ankit.srivastava.0015/",
      linkedln: "https://www.linkedin.com/in/srivastavaankit15/",
      git: "https://github.com/Srivastavaankit15",
    },
    {
      id: 15,
      name: "Raktim Bhuyan",
      rank: "Senior Associate",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524908/webp%20pics/Raktim_Bhuyan-_1__wmy1az.webp",
      fb: "https://www.facebook.com/raktim.bhuyan.756/",
      linkedln: "https://www.linkedin.com/in/raktim-bhuyan-337299211",
      git: "https://github.com/Raktim-Bhuyan",
    },
    {
      id: 16,
      name: "Shubham Kumar ",
      rank: "Senior Associate ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1680524907/webp%20pics/shubham-_1__1_kcgxaw.webp",
      fb: "https://www.facebook.com/profile.php?id=100058575665353",
      linkedln: "http://linkedin.com/in/shubham-kumar-03540b20b",
      git: "",
    },
    {
      id: 17,
      name: "Rithyam Pathak",
      rank: "Senior Associate ",
      image:
        "https://res.cloudinary.com/dz7qkvqyj/image/upload/v1685862263/Rithyam_kbjusn.jpg",
      fb: "https://www.facebook.com/ridam.pathak.9/",
      linkedln: "http://linkedin.com/in/rithyam-pathak-5b478220a",
      git: "",
    },
    {
      id: 17,
      name: "Agneesh Dasgupta",
      rank: "Senior Associate ",
      image:
        "https://res.cloudinary.com/dp92qug2f/image/upload/v1686713010/1682973324116_bnb3z6.jpg",
      fb: "https://www.facebook.com/agneesh.dasgupta",
      linkedln: "https://www.linkedin.com/in/agneesh-dasgupta-81090a1bb/",
      git: "https://github.com/Agneeshz",
    },
  ],
};
export const coreTeams = coreTeamData;
