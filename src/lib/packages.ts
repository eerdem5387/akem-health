export type PackageCategory = "all" | "hair" | "dental" | "plastic" | "bariatric" | "eye";

export const packagesMeta = [
  {
    id: "hair",
    category: "hair" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCluY1gQWoxW1WTMtFIjwvqiUdg-XB4FX27Tww1SWYtB8joF_SaZ1KX0vchyxA_LG5kMnJAhlwzDIH_-Ps1njQlgB4KIc4vF4BXo_DPMugt2EVc4FkFDyDuvaOoT7nT-t5bbK-WC-FnuVFnxKNURzhDtzM6v2a_2OtlMrsDLEQz0n3EC62zK7v2VjHQ_K3JbC_yHyq9FTs34nxIlv06oFUGSi9Wd0NZqNtsH9ROD-ls",
  },
  {
    id: "dental",
    category: "dental" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBkK8znrUmllKkorJOKGFyggXgFZSeUOOQ-tHc_k1x2zAyp9k8y6dPKH_UlVvIwFuC9gurI-ahz-HpPIq0QaHdKFafsi7_X55SuGu3gfWkNNirHvtIBawBynNP7i2spwAIXuebQ34Umst5mN2i0z2F473X3GCd0IJtKlYNYmnRIa4aNLhEXRapXG1TIdPC71HS0Jhhd4zc7OgtmQA0eFTB-yWNa8z724ngLoUQn2UqY",
  },
  {
    id: "plastic",
    category: "plastic" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCgnDo4Ij1R89sZHVSC9ETUXStmKTlagggkmi4dG5JWqOfPPcXhwp4mlHovSloxA_qTFvJbaSgNPtCjhBNsziKpNn4WLKJ0xWiJZ8TyUrXU0IJOoUxSsB8d-aFj_1Jeo9meKzZ3dXQwj9V5J_W3B9MJw6aezc3HVq1NMJd1KCBsWx8Uyzt5fDnk7OX1t6XGRiUH5p4AxE0e48UZZe_P45qloLVM8onGDBdmkNkLhIpr",
  },
  {
    id: "bariatric",
    category: "bariatric" as const,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxxUJQM866BA-zdmp0KK3Xkeem4DSqToxYdpxmahqYBzMC8Y0PPNv6s5cRn2Y0wGNBYswk6ysgNvtLgHQVWjTuPIX2txrtu4JOqXoaBVIL13SJxLdH75ntlEQvCvgXAsa9WdLqX4PHMIobptejS3KsJyhFcqb9n6nm5L4a9tkx2utnjzUD-eS4VxKJks_Ax1l21Swb07U54Bs1Tl2HCuCnhd5-I2F9tW5HWp1ibzDY",
  },
] as const;
