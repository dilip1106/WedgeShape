import React, { useState } from 'react';

const images1 = [
  // Add URLs for images in the first array
  "https://user-images.githubusercontent.com/79829365/150636986-075a35cd-0e7e-4cf1-af58-0e8881f48fc1.jpg",
  "https://user-images.githubusercontent.com/79829365/150636993-98f91612-0ec5-4094-9826-f1f07803764d.jpg",
  "https://user-images.githubusercontent.com/79829365/150637003-d39177cd-f0d4-414c-9f86-5181271724df.jpg",
  "https://user-images.githubusercontent.com/79829365/150637026-eea0d810-fbc5-4675-9f42-80c90a1a7adf.jpg",
  "https://user-images.githubusercontent.com/79829365/150637095-9e4b4fbc-8722-4771-a310-719d12cf27ea.jpg",
  "https://user-images.githubusercontent.com/79829365/150637117-e3a88497-425d-4dd8-aaaf-7f30daa548b3.jpg",
  "https://user-images.githubusercontent.com/79829365/150637133-e2143a35-fa36-4c2f-ae7d-d08640c68663.jpg",
  "https://user-images.githubusercontent.com/79829365/150637400-a23b528e-9e46-429b-a9a0-0e7547955e4a.jpg",
  "https://user-images.githubusercontent.com/79829365/150637406-2bc6d25e-d965-4dee-bfc8-9b955892564c.jpg",
  "https://user-images.githubusercontent.com/79829365/150637410-d26fa61e-4ea2-47f2-aaf4-3c811e4d2522.jpg",
  "https://user-images.githubusercontent.com/79829365/150637416-c0fb22f1-6691-4357-bd76-ccd481ab596b.jpg",
  "https://user-images.githubusercontent.com/79829365/150637425-b20f4ca9-35cf-4e91-bfd3-a580be5a1f0e.jpg",
  "https://user-images.githubusercontent.com/79829365/150637433-10e1caf2-6823-476b-91a5-d3363c3c80b6.jpg",
  "https://user-images.githubusercontent.com/79829365/150637445-18a81f7c-58cc-435a-89ad-450be046d22b.jpg",
  "https://user-images.githubusercontent.com/79829365/150637455-834ee5da-6a6c-4d1b-9ff9-0d34b1c3e5fc.jpg",
  "https://user-images.githubusercontent.com/79829365/150637467-44815bfe-927b-46c4-8f85-70c822e8b3d1.jpg",
  "https://user-images.githubusercontent.com/79829365/150637474-de7966d6-a24d-4723-abd3-5f784e04eca5.jpg",
  "https://user-images.githubusercontent.com/79829365/150637484-34fe18ae-7f69-4330-a1ad-aad6846c06f1.jpg",
  "https://user-images.githubusercontent.com/79829365/150637502-b4a022a6-6dff-4e4e-96d1-eec27806a566.jpg",
  "https://user-images.githubusercontent.com/79829365/150637516-fff582d8-127d-4688-9c39-a025a25f129b.jpg",
  "https://user-images.githubusercontent.com/79829365/150637525-a38c7102-1413-4c0f-90df-5279e9893a7e.jpg",
  "https://user-images.githubusercontent.com/79829365/150637531-8608653f-812c-4db3-82f6-e12226a2f656.jpg",
  "https://user-images.githubusercontent.com/79829365/150637542-ef774ad6-d3fa-4587-8eb1-42c601c108d8.jpg",
  "https://user-images.githubusercontent.com/79829365/150637548-2fec4002-4bce-4d74-82b2-443dab7a6216.jpg",
  "https://user-images.githubusercontent.com/79829365/150637574-e3978a50-1dc3-41fc-add8-669d47c8230e.jpg",
  "https://user-images.githubusercontent.com/79829365/150637578-5973b5dc-032a-4f59-ad8b-2fa5eb47becf.jpg",
  "https://user-images.githubusercontent.com/79829365/150637580-80ceb01c-053b-4e22-9d9c-211f1c324e95.jpg",
  "https://user-images.githubusercontent.com/79829365/150637583-4d44113f-9369-4faf-8044-c360913ae336.jpg",
  "https://user-images.githubusercontent.com/79829365/150637585-63340ae8-9d1d-4509-9d1e-fbc7ad35c4bd.jpg",
  "https://user-images.githubusercontent.com/79829365/150637606-57a9400b-6674-496e-bd46-8d2b7b9803b7.jpg",
  "https://user-images.githubusercontent.com/79829365/150637611-10dc83dc-1ffa-496d-90b8-d71a10f2da6e.jpg",
  "https://user-images.githubusercontent.com/79829365/150637620-f9e42d81-df96-42c4-87ac-a4f771e1ba2e.jpg",
  "https://user-images.githubusercontent.com/79829365/150637628-5a8e35b5-e799-4126-a65f-f86672d6c36f.jpg",
  "https://user-images.githubusercontent.com/79829365/150637632-b577e8ee-9403-491e-abec-a32f5488ec51.jpg",
  "https://user-images.githubusercontent.com/79829365/150637637-14d9071b-65ec-4e42-a0c2-015b607d886d.jpg",
  "https://user-images.githubusercontent.com/79829365/150637644-d9e3d4b5-5c25-4d4d-b619-397548a398bc.jpg",
  "https://user-images.githubusercontent.com/79829365/150637659-67dbf235-bbaf-4203-9627-691597bdd6a9.jpg",
  "https://user-images.githubusercontent.com/79829365/150637665-40232cf0-dde8-4f80-902c-d5603a258534.jpg",
  "https://user-images.githubusercontent.com/79829365/150637676-09a98ab0-cf00-4449-aa5d-02860a7d5d2d.jpg",
  "https://user-images.githubusercontent.com/79829365/150637689-d28a31fb-c498-4a94-8649-01ecadbf1f98.jpg",
  "https://user-images.githubusercontent.com/79829365/150637732-c88d52ba-ed11-4ed8-ac3c-8208e4719875.jpg",
  "https://user-images.githubusercontent.com/79829365/150637739-c311b8f5-2a42-4a28-a6cf-5a250b591325.jpg",
  "https://user-images.githubusercontent.com/79829365/150637749-50b7de7f-9980-4a2c-8c38-588e7fd4ddb2.jpg",
  "https://user-images.githubusercontent.com/79829365/150637810-c527df32-8c17-449c-ba27-6c03c7dbac3d.jpg",
  "https://user-images.githubusercontent.com/79829365/150637817-c8c848af-ef14-46a8-b2e4-4e75c3f4580f.jpg",
  "https://user-images.githubusercontent.com/79829365/150637824-6b60c69b-c2bc-4664-b828-416a2aff7087.jpg",
  "https://user-images.githubusercontent.com/79829365/150637876-81ccc951-bff7-40e7-b2ed-3d909fe807dd.jpg",
  "https://user-images.githubusercontent.com/79829365/150637883-e156edf2-67d9-46d0-9aa1-ea9fbe09c392.jpg",
  "https://user-images.githubusercontent.com/79829365/150637889-4a193031-3117-49f4-aaa8-80f7b4e7e257.jpg",
  "https://user-images.githubusercontent.com/79829365/150637891-76314c14-537f-439c-821d-9872e39f33cf.jpg",
  "https://user-images.githubusercontent.com/79829365/150637894-9276f2b0-40e2-4190-a337-94532d4417fa.jpg",
  "https://user-images.githubusercontent.com/79829365/150639145-d7f60f55-c88b-46a9-8583-055b45d60c94.jpg",
  "https://user-images.githubusercontent.com/79829365/150639150-a7d6eaac-ad28-4e92-91f0-2f13ebb09234.jpg",
  "https://user-images.githubusercontent.com/79829365/150639277-d71ab942-edf7-415a-ac12-ea5fcb1523a7.jpg",
  "https://user-images.githubusercontent.com/79829365/150639280-11f013c9-a8c1-4fad-a372-ce1f7078e114.jpg",
  "https://user-images.githubusercontent.com/79829365/150639291-8f6d18df-ac07-49aa-a727-21220929d984.jpg",
  "https://user-images.githubusercontent.com/79829365/150639298-75fc149f-da4c-494e-98a7-27abc86392a2.jpg",
  "https://user-images.githubusercontent.com/79829365/150639304-68cc0233-137c-48ce-af6b-29832bd4aca9.jpg",
  "https://user-images.githubusercontent.com/79829365/150639315-bd429b11-f478-4a08-a494-8f1ce5048cea.jpg",
  "https://user-images.githubusercontent.com/79829365/150639320-b0d20752-963b-4d29-85e4-5bf33817203c.jpg",
  "https://user-images.githubusercontent.com/79829365/150639326-adb47ecc-4da1-4cbb-b4dd-7178b93b034c.jpg",
  "https://user-images.githubusercontent.com/79829365/150639329-eeb70c76-06ed-4bff-a202-3e87271bd412.jpg",
  "https://user-images.githubusercontent.com/79829365/150639334-ba497659-69f7-4cdc-a327-348236813230.jpg",
  "https://user-images.githubusercontent.com/79829365/150639344-2a1fcfbc-5ace-4a61-a872-9a4ed16fd90a.jpg",
  "https://user-images.githubusercontent.com/79829365/150639349-2f5faa07-ec70-48bb-ad98-0f7eeb7c1292.jpg",
  "https://user-images.githubusercontent.com/79829365/150639355-805a3af3-9007-4e07-8211-629bcad6f5f2.jpg",
  "https://user-images.githubusercontent.com/79829365/150639362-ad5c379b-37f8-4f58-8949-be685f07c0e5.jpg",
  "https://user-images.githubusercontent.com/79829365/150639367-4792a0b6-69c7-4638-918a-d9cb5dd08777.jpg",
  "https://user-images.githubusercontent.com/79829365/150639369-c1b62e72-e450-440c-88b6-8e58afd05ba9.jpg",
  "https://user-images.githubusercontent.com/79829365/150639371-9c81e4b5-318f-4705-91b8-2a327adeff67.jpg",
  "https://user-images.githubusercontent.com/79829365/150639379-fb6f69d3-2e2f-4373-86f9-d689870c9ecd.jpg",
  "https://user-images.githubusercontent.com/79829365/150639384-6b0c89cf-8ca5-41e6-b46a-5d85b7ecdce9.jpg",
  "https://user-images.githubusercontent.com/79829365/150639389-be727136-4db4-422a-bb9e-c75b5f2391d1.jpg",
  "https://user-images.githubusercontent.com/79829365/150639394-7ef37c81-7b99-43a5-9426-d9e1f5388ff1.jpg",
  "https://user-images.githubusercontent.com/79829365/150639396-548ed23d-abf9-4136-b1ad-86d1ab97ac15.jpg",
  "https://user-images.githubusercontent.com/79829365/150639400-a30affac-2ded-4d90-b3bd-c94b2393d241.jpg",
  "https://user-images.githubusercontent.com/79829365/150639406-4b39f95e-f919-495a-b693-d190ca3a95b6.jpg",
  "https://user-images.githubusercontent.com/79829365/150639409-6029ba65-f297-4c30-b79f-126d31273466.jpg",
  "https://user-images.githubusercontent.com/79829365/150639411-ca36c5cf-6168-49ee-8edb-0e1416435c07.jpg",
  "https://user-images.githubusercontent.com/79829365/150639414-4fb31fb7-b6ac-462a-8534-9b06695f6878.jpg",
  "https://user-images.githubusercontent.com/79829365/150639418-73144c48-7736-40c6-82d3-5f04eac0bda0.jpg",
  "https://user-images.githubusercontent.com/79829365/150639420-56ec77e2-fc8c-4e6c-bf24-b909e1817357.jpg",
  "https://user-images.githubusercontent.com/79829365/150639423-4ad8a43d-4091-4c11-972f-bf03a4a50314.jpg",
  "https://user-images.githubusercontent.com/79829365/150639425-599dcfb0-26b7-4699-913f-75feaef1e72f.jpg",
  "https://user-images.githubusercontent.com/79829365/150639430-d6c5729f-ff11-4372-ad6f-c9dc1d886d2b.jpg",
  "https://user-images.githubusercontent.com/79829365/150639433-422151c2-670c-4f2e-92d4-3fbe38b65950.jpg",
  "https://user-images.githubusercontent.com/79829365/150639439-6046957e-9f80-415c-bedb-1048321f8ea5.jpg",
  "https://user-images.githubusercontent.com/79829365/150639440-90ba5164-fee7-4727-9114-aaf833f55b7e.jpg",
  "https://user-images.githubusercontent.com/79829365/150639445-64e71938-352e-4fa7-8a87-2252d43d45bf.jpg",
  "https://user-images.githubusercontent.com/79829365/150639449-3207f07e-07e0-46a4-9f37-735d427ff3f4.jpg",
  "https://user-images.githubusercontent.com/79829365/150639458-b7553f9c-cd03-461d-9b19-0634f514cb22.jpg",
  "https://user-images.githubusercontent.com/79829365/150639465-08f1cd1d-3f64-4940-80b5-f8d927329d59.jpg",
  "https://user-images.githubusercontent.com/79829365/150639469-e18412c9-67f5-4669-b2a2-ed0a2cd90ae1.jpg",
  "https://user-images.githubusercontent.com/79829365/150639473-43fdd5ba-e014-4d30-93c7-53fc6f01afaf.jpg",
  "https://user-images.githubusercontent.com/79829365/150639483-c3396996-261f-41fe-9589-d73acbbe9d60.jpg",
  "https://user-images.githubusercontent.com/79829365/150639484-743f4a14-6773-4c4f-9ac1-fc017db4d641.jpg",
  "https://user-images.githubusercontent.com/79829365/150639488-6db805ed-9c7a-4fc0-91be-9b90f149c8df.jpg",
  "https://user-images.githubusercontent.com/79829365/150639489-a2d24e70-3b31-448e-b053-4f29ca4ab736.jpg",
  "https://user-images.githubusercontent.com/79829365/150639490-36b3037a-a54e-48f4-9de7-30e4c3d3e9fc.jpg",
  "https://user-images.githubusercontent.com/79829365/150639495-8b4da33f-0a7c-4710-bb53-64038523b843.jpg",
  "https://user-images.githubusercontent.com/79829365/150639504-3c0cc872-4883-4c42-bc81-a8097a00ce24.jpg"

];

const images2 = [
  // Add URLs for images in the second array
  "https://user-images.githubusercontent.com/79829365/150641485-54ddfe17-5b19-4daa-b3c7-82d3926b796f.jpg",
  "https://user-images.githubusercontent.com/79829365/150641604-980c0de1-afa4-4f3a-ae4c-d2128a3b59ec.jpg",
  "https://user-images.githubusercontent.com/79829365/150641622-3f47e6dc-cd11-4b4f-bf61-da7b3ceaefa6.jpg",
  "https://user-images.githubusercontent.com/79829365/150641628-b45c9577-f360-4df5-9402-677da50dc89f.jpg",
  "https://user-images.githubusercontent.com/79829365/150641634-d8b839c6-0424-4591-a410-e92d839ef492.jpg",
  "https://user-images.githubusercontent.com/79829365/150641640-e2a03d1a-00cd-4ca8-b80d-1b18848c4d13.jpg",
  "https://user-images.githubusercontent.com/79829365/150641647-3769f96e-212e-4f67-99ad-03c1ea4cca3b.jpg",
  "https://user-images.githubusercontent.com/79829365/150641650-0ee02478-9b18-4ad9-9cf0-49d30e320066.jpg",
  "https://user-images.githubusercontent.com/79829365/150641653-4a8a03c1-0d26-4717-91a6-ad06e73a50b2.jpg",
  "https://user-images.githubusercontent.com/79829365/150641664-39da9708-da86-4d23-8bf1-4488791a8ecb.jpg",
  "https://user-images.githubusercontent.com/79829365/150641677-a25f860c-ffff-4b56-a63f-6bda963ee3f9.jpg",
  "https://user-images.githubusercontent.com/79829365/150641686-0c36ce79-c27e-482f-b187-9cac902e5300.jpg",
  "https://user-images.githubusercontent.com/79829365/150641704-57bf14fb-822d-4293-808d-846bee62058e.jpg",
  "https://user-images.githubusercontent.com/79829365/150641721-8b38d140-4256-404b-9064-3e18e4a87b98.jpg",
  "https://user-images.githubusercontent.com/79829365/150641740-1c59ee3f-ae96-4d28-8439-e3e130a13e5c.jpg",
  "https://user-images.githubusercontent.com/79829365/150641761-51083be3-7b92-4a68-b2fb-259ab6627948.jpg",
  "https://user-images.githubusercontent.com/79829365/150641767-977a108d-944b-4402-bc3d-afa3b46722ca.jpg",
  "https://user-images.githubusercontent.com/79829365/150641774-31894482-f2b4-4d8f-9d75-5f918b520fed.jpg",
  "https://user-images.githubusercontent.com/79829365/150641779-6e026f9c-ce97-475b-a73d-e55b37352db8.jpg",
  "https://user-images.githubusercontent.com/79829365/150641786-331ade9a-0684-49d0-974e-ecb62857f77a.jpg",
  "https://user-images.githubusercontent.com/79829365/150641794-4cdad784-e33f-4b33-aac6-1edbd2c652c7.jpg",
  "https://user-images.githubusercontent.com/79829365/150641798-87330af1-b56c-4bb3-9bb5-4a226e7b6235.jpg",
  "https://user-images.githubusercontent.com/79829365/150641804-5c6c84da-bb1c-4e26-b032-6a611d7ceaac.jpg",
  "https://user-images.githubusercontent.com/79829365/150641807-3acafbd5-98b4-4cee-bb3c-927c1df2e9fb.jpg",
  "https://user-images.githubusercontent.com/79829365/150641810-4e771e1c-7f2d-4ced-8de6-6eaa85dfbe42.jpg",
  "https://user-images.githubusercontent.com/79829365/150641814-11edd805-55d4-4d06-af63-2f12c1a6daaf.jpg",
  "https://user-images.githubusercontent.com/79829365/150641959-fb0a81a8-e637-4409-9768-062a5ceb23cc.jpg",
  "https://user-images.githubusercontent.com/79829365/150641963-9f6c6ade-4e02-49ac-acb9-cdb729477166.jpg",
  "https://user-images.githubusercontent.com/79829365/150641966-f46168cf-41fa-4cb1-a1e3-23ec364dfa4c.jpg",
  "https://user-images.githubusercontent.com/79829365/150641969-2c47f68b-bacc-4087-8ef9-47367b6df750.jpg",
  "https://user-images.githubusercontent.com/79829365/150641973-6f02b854-14a2-44ac-af4c-05d6b7112a5c.jpg",
  "https://user-images.githubusercontent.com/79829365/150641980-47b12b59-36fb-49a5-8dd8-295dcdcbbe48.jpg",
  "https://user-images.githubusercontent.com/79829365/150641984-6d6f3656-5b3a-4ae5-9ef9-10778ede142c.jpg",
  "https://user-images.githubusercontent.com/79829365/150641992-ffb5cc26-3d55-489f-b52a-9b4eaeccf234.jpg",
  "https://user-images.githubusercontent.com/79829365/150642001-122638fe-bc66-41f6-ab49-c2d6b286d395.jpg",
  "https://user-images.githubusercontent.com/79829365/150642005-b706d343-ea06-4f7f-a41b-be58bba7df94.jpg",
  "https://user-images.githubusercontent.com/79829365/150642009-6ed2382a-b3f0-476c-9d6f-1fc05986c622.jpg",
  "https://user-images.githubusercontent.com/79829365/150642017-3ef5296e-0009-40ee-aee7-ddc21015555a.jpg",
  "https://user-images.githubusercontent.com/79829365/150642022-7417eb81-58f7-4a02-937e-c0493fdd81f3.jpg",
  "https://user-images.githubusercontent.com/79829365/150642026-c282892f-54ec-4eaa-8c32-2725ed2f8e33.jpg",
  "https://user-images.githubusercontent.com/79829365/150642030-5999998b-5288-44eb-90f2-a6afe43cfd8d.jpg",
  "https://user-images.githubusercontent.com/79829365/150642033-4ef829a4-16b9-497a-84f9-546bd31f138f.jpg",
  "https://user-images.githubusercontent.com/79829365/150642036-ce2ca942-32f1-4333-b8bd-132dc52c2b90.jpg",
  "https://user-images.githubusercontent.com/79829365/150642043-4017e46b-062b-4dd9-a074-208a54569224.jpg",
  "https://user-images.githubusercontent.com/79829365/150642046-26352391-328c-4f65-9228-e694d37fe9cf.jpg",
  "https://user-images.githubusercontent.com/79829365/150642050-606ce64b-b673-47bb-a4ad-14cf8da3d2ce.jpg",
  "https://user-images.githubusercontent.com/79829365/150642053-832b92a4-d03e-4b0a-ad0a-ccf3228a2aa3.jpg",
  "https://user-images.githubusercontent.com/79829365/150642056-dc0a89ed-4ab3-4398-bcc3-ba6b767d8313.jpg",
  "https://user-images.githubusercontent.com/79829365/150642062-2bf20e41-ced0-436c-9192-9907a4cbbcb6.jpg",
  "https://user-images.githubusercontent.com/79829365/150642064-bde91939-f8c0-4514-af52-8cb0a609d0c4.jpg",
  "https://user-images.githubusercontent.com/79829365/150642072-bc9f9b57-33c3-401c-85c1-9473cb80cc05.jpg",
  "https://user-images.githubusercontent.com/79829365/150642077-f3afab32-cb5a-4e18-ba90-fb28812fedd0.jpg",
  "https://user-images.githubusercontent.com/79829365/150642081-34d7dfd9-326c-42b0-9714-d08d33b23091.jpg",
  "https://user-images.githubusercontent.com/79829365/150642084-1613d614-541d-47ad-a902-b467e7d7b98e.jpg",
  "https://user-images.githubusercontent.com/79829365/150642089-debdad62-b4f5-4f13-b306-095043ab5fad.jpg",
  "https://user-images.githubusercontent.com/79829365/150642100-f9143630-5d13-4e5c-bd5d-0e2f86cca637.jpg",
  "https://user-images.githubusercontent.com/79829365/150642104-f8c934cd-ee6f-476c-8d2d-7e8d8fe2b736.jpg",
  "https://user-images.githubusercontent.com/79829365/150642108-554577e1-a9e6-4c33-a06d-1cfd03247daa.jpg",
  "https://user-images.githubusercontent.com/79829365/150642113-dc67eedf-5f92-4029-ab15-64b87a6502cc.jpg",
  "https://user-images.githubusercontent.com/79829365/150642119-2b5cf09c-bbde-41fa-a676-7dbdf8dc68f5.jpg",
  "https://user-images.githubusercontent.com/79829365/150642123-b0111896-08f1-4114-bd1e-b3f39c79be26.jpg",
  "https://user-images.githubusercontent.com/79829365/150642130-524cf55a-99fa-4a68-a7ed-39a3ec33a5e9.jpg",
  "https://user-images.githubusercontent.com/79829365/150642132-d7ec96c4-f00e-4f0e-b28f-857f169c556b.jpg",
  "https://user-images.githubusercontent.com/79829365/150642135-a53bb408-ff7b-4e77-b9d7-868f202eaecb.jpg",
  "https://user-images.githubusercontent.com/79829365/150642144-e009d310-4fb5-49b4-9967-10f33e67d274.jpg",
  "https://user-images.githubusercontent.com/79829365/150642150-b5db9cf0-3adc-4616-bd18-1b03aed6a0a6.jpg",
  "https://user-images.githubusercontent.com/79829365/150642154-5eba1033-b0d0-4d28-9e80-d1be09e75ac4.jpg",
  "https://user-images.githubusercontent.com/79829365/150642161-a5ea3bf2-1edf-4a56-963c-f3642740ea2c.jpg",
  "https://user-images.githubusercontent.com/79829365/150642167-2f55156b-9f74-4e7d-9524-1be9a700e6f3.jpg",
  "https://user-images.githubusercontent.com/79829365/150642172-b72c7e81-6bb9-458a-bc6f-5b6ffa3ae2e0.jpg",
  "https://user-images.githubusercontent.com/79829365/150642174-e3e0e901-2e28-45c0-a32c-69340894a8d4.jpg",
  "https://user-images.githubusercontent.com/79829365/150642180-53132aef-b7d4-419c-9ea1-dc08237ae3c8.jpg",
  "https://user-images.githubusercontent.com/79829365/150642191-2243d7a6-1195-4ea1-accf-de6e6fe3d13d.jpg",
  "https://user-images.githubusercontent.com/79829365/150642194-2eed2afc-e54d-4f78-a6f6-815807417e4a.jpg",
  "https://user-images.githubusercontent.com/79829365/150642200-33538d43-f2c3-4c62-8c5c-48f0f0aa26f0.jpg",
  "https://user-images.githubusercontent.com/79829365/150642203-08e9de25-e3e3-48e7-bedb-dd3c7ff685a1.jpg",
  "https://user-images.githubusercontent.com/79829365/150642210-1e93b7c9-1f3c-4070-ad43-a1852d38a283.jpg",
  "https://user-images.githubusercontent.com/79829365/150642215-8066e4b3-3cf8-46f1-8201-1ad7c4d89f11.jpg",
  "https://user-images.githubusercontent.com/79829365/150642217-52767885-426f-40e8-8484-2f4838f901f3.jpg",
  "https://user-images.githubusercontent.com/79829365/150642227-10d5e1b6-2a90-4c90-b43b-e5188731ee9a.jpg",
  "https://user-images.githubusercontent.com/79829365/150642231-ab4de913-de2b-4b50-803e-017c6ad2038b.jpg",
  "https://user-images.githubusercontent.com/79829365/150642237-47620bd3-3778-4916-b64e-f9a942fe2564.jpg",
  "https://user-images.githubusercontent.com/79829365/150642239-d7039124-f945-4feb-b207-1d70ffa23183.jpg",
  "https://user-images.githubusercontent.com/79829365/150642241-d623d9e6-71f9-4d75-835b-86aeecfa16a1.jpg",
  "https://user-images.githubusercontent.com/79829365/150642246-9a97673c-1ca5-47a5-a61b-a9dafa131276.jpg",
  "https://user-images.githubusercontent.com/79829365/150642250-90bf4430-977c-4670-8efa-e0f4ae0dd652.jpg",
  "https://user-images.githubusercontent.com/79829365/150642278-f66c0a49-58c6-4c54-9232-8084fd537560.jpg",
  "https://user-images.githubusercontent.com/79829365/150642284-16a37700-d081-4478-84ff-d351bae8be4e.jpg",
  "https://user-images.githubusercontent.com/79829365/150642287-f6a37c34-f672-4cd6-89a5-d0fd2274777c.jpg",
  "https://user-images.githubusercontent.com/79829365/150642295-68f26f02-f9ce-41a3-8265-15988452c021.jpg",
  "https://user-images.githubusercontent.com/79829365/150642301-b73f6a95-3cdb-4c09-b8ca-222897eb7ca0.jpg",
  "https://user-images.githubusercontent.com/79829365/150642319-56ae1a86-2c56-44fb-a2de-4137d63fc403.jpg",
  "https://user-images.githubusercontent.com/79829365/150642324-c979658a-102f-49a3-9dc2-af618d1f0151.jpg",
  "https://user-images.githubusercontent.com/79829365/150642330-2ade263b-157a-40d8-95bb-6dbd6c617848.jpg",
  "https://user-images.githubusercontent.com/79829365/150642336-d0dc4c68-9e1a-4ab7-bdfb-8cabe01c0769.jpg",
  "https://user-images.githubusercontent.com/79829365/150642340-1d63ba76-a508-4d9c-9593-7cd3028dafdd.jpg",
  "https://user-images.githubusercontent.com/79829365/150642342-771b1a16-f4a6-4265-839f-276ae58aa659.jpg",
  "https://user-images.githubusercontent.com/79829365/150642349-0dbb9604-5c60-4a98-95bf-23cd281d0fde.jpg",
  "https://user-images.githubusercontent.com/79829365/150642355-9ed0dc9b-83cb-45a9-acb8-f54dfb42b850.jpg",
  "https://user-images.githubusercontent.com/85828652/150642622-0a2812bf-6438-40ed-9799-ccc705c41612.jpg",
  "https://user-images.githubusercontent.com/85828652/150642634-8b12cc6e-c9ea-40f9-a90b-64b0bdd8637a.jpg"

];

const images3 = [
  // Add URLs for images in the third array
  "https://user-images.githubusercontent.com/85828652/150644006-316608f6-10db-4a85-9ae9-299c50529a27.jpg",
  "https://user-images.githubusercontent.com/85828652/150644013-1b2b0309-8660-4998-8074-1ca03d17b392.jpg",
  "https://user-images.githubusercontent.com/85828652/150644034-08f246b4-0d3e-45fe-9969-a9f8bd43f33e.jpg",
  "https://user-images.githubusercontent.com/85828652/150644039-f9ce1328-f51c-4e70-870e-21af3ed0899f.jpg",
  "https://user-images.githubusercontent.com/85828652/150644132-45265ffa-207f-45d2-9066-847ee5a84e7d.jpg",
  "https://user-images.githubusercontent.com/85828652/150644137-97ef7f29-7f47-476b-92c5-e22c4aaf5d64.jpg",
  "https://user-images.githubusercontent.com/85828652/150644144-73480a0d-fb41-4acc-90b4-deec7fef56e8.jpg",
  "https://user-images.githubusercontent.com/85828652/150644146-ccbf7499-dfdf-4785-b1fc-e2f70cc436ed.jpg",
  "https://user-images.githubusercontent.com/85828652/150644152-7fad6126-5a22-4b76-87ad-8826c7934507.jpg",
  "https://user-images.githubusercontent.com/85828652/150644156-3299d3a0-50d0-437b-85ac-a3fa217737c4.jpg",
  "https://user-images.githubusercontent.com/85828652/150644158-8ec43496-0180-4aff-b583-cb19f4d2e1bd.jpg",
  "https://user-images.githubusercontent.com/85828652/150644160-ed29b485-a075-4f04-821a-6a74758552d7.jpg",
  "https://user-images.githubusercontent.com/85828652/150644163-51d9b91c-5783-4efc-8990-a4d94fb260b7.jpg",
  "https://user-images.githubusercontent.com/85828652/150644167-a6a7f6a3-6b2c-40c5-b837-fccaec226398.jpg",
  "https://user-images.githubusercontent.com/85828652/150644172-ee69e132-0120-4b37-8472-a301a2d42e44.jpg",
  "https://user-images.githubusercontent.com/85828652/150644175-44377e59-d16a-44e4-982b-d30e24632e45.jpg",
  "https://user-images.githubusercontent.com/85828652/150644179-083fc04f-e790-4bfc-853f-24e4e5f46b40.jpg",
  "https://user-images.githubusercontent.com/85828652/150644183-5d9fc29b-0715-4551-9a5d-3161a77bb35e.jpg",
  "https://user-images.githubusercontent.com/85828652/150644185-7e1519f5-c561-4f76-8924-2ac855c537bc.jpg",
  "https://user-images.githubusercontent.com/85828652/150644191-f5d457d2-5bfb-42cb-b95f-fc7fe0924be8.jpg",
  "https://user-images.githubusercontent.com/85828652/150644206-a52cf5d2-8bb3-4d01-b629-f4441cb2ae1d.jpg",
  "https://user-images.githubusercontent.com/85828652/150644210-5fc4e81b-7c98-49b2-9017-b5205f3aa2da.jpg",
  "https://user-images.githubusercontent.com/85828652/150644214-01e6d454-790e-4f29-a02b-3ed17411cbbc.jpg",
  "https://user-images.githubusercontent.com/85828652/150644219-3ef766ed-f23a-4240-99a0-ef4db1fccd98.jpg",
  "https://user-images.githubusercontent.com/85828652/150644221-01031520-090b-438e-8a43-c9661e002883.jpg",
  "https://user-images.githubusercontent.com/85828652/150644224-1ab8bf88-b3f8-471f-925e-f50577790c06.jpg",
  "https://user-images.githubusercontent.com/85828652/150644230-8dc6922b-f855-48df-b0de-37446be8c6ca.jpg",
  "https://user-images.githubusercontent.com/85828652/150644232-cac62e3d-cf59-43e6-a183-de2e570ae704.jpg",
  "https://user-images.githubusercontent.com/85828652/150644233-db1bf0bd-9320-49e4-a673-b8d4ee75454c.jpg",
  "https://user-images.githubusercontent.com/85828652/150644236-fc68967e-7d3f-4194-bb60-8f8b3cbf9ab0.jpg",
  "https://user-images.githubusercontent.com/85828652/150644240-be1b1da5-ecdb-437c-b40a-e16c5a9b093d.jpg",
  "https://user-images.githubusercontent.com/85828652/150644245-0cf54f72-c843-44ac-a742-71b698f15737.jpg",
  "https://user-images.githubusercontent.com/85828652/150644247-515c740a-1df6-4eb2-9049-22e1bce19bef.jpg",
  "https://user-images.githubusercontent.com/85828652/150644261-002815a5-92a5-4d9f-b8d8-ec07f477688e.jpg",
  "https://user-images.githubusercontent.com/85828652/150644281-931ceaa0-45ef-40c2-b508-467c6818fa46.jpg",
  "https://user-images.githubusercontent.com/85828652/150644285-1079b009-64b3-4d41-b853-8566f87b0381.jpg",
  "https://user-images.githubusercontent.com/85828652/150644292-fbda2bf9-7de0-4034-8d2e-a713dda292e1.jpg",
  "https://user-images.githubusercontent.com/85828652/150644294-5ba62edb-ae0f-45a3-9a30-68e3b66bf29f.jpg",
  "https://user-images.githubusercontent.com/85828652/150644296-5b62bc7b-0a72-4134-b6dd-2275b97b91a1.jpg",
  "https://user-images.githubusercontent.com/85828652/150644299-f9c0f583-3557-4a12-9738-8c320e68a4a9.jpg",
  "https://user-images.githubusercontent.com/85828652/150644303-48499cd5-b751-4b0d-8aae-505f40026c58.jpg",
  "https://user-images.githubusercontent.com/85828652/150644312-7c2f728f-989e-4ae7-a7ba-33b89e098655.jpg",
  "https://user-images.githubusercontent.com/85828652/150644318-91f5f890-adc2-45d7-b8f5-076c19c672c6.jpg",
  "https://user-images.githubusercontent.com/85828652/150644322-c9333d48-c378-43a5-9bbd-e72daaab9f21.jpg",
  "https://user-images.githubusercontent.com/85828652/150644340-3735d480-1e5a-4216-a59d-7d5c2d4a3df1.jpg",
  "https://user-images.githubusercontent.com/85828652/150644344-9de587e9-c418-4129-affb-2f5d92a61b57.jpg",
  "https://user-images.githubusercontent.com/85828652/150644348-590326ff-82fa-4237-b7a6-cd070024682c.jpg",
  "https://user-images.githubusercontent.com/85828652/150644353-b928c11f-6af8-489f-a817-bab2aacaa8c6.jpg",
  "https://user-images.githubusercontent.com/85828652/150644362-dd804cd5-b023-4b97-aed2-767294fd553c.jpg",
  "https://user-images.githubusercontent.com/85828652/150644377-8ca6a022-1eca-4b60-baa8-3bb73427ddf1.jpg",
  "https://user-images.githubusercontent.com/85828652/150644384-ee2a36d3-4371-4a83-a65c-22b7391cf24b.jpg",
  "https://user-images.githubusercontent.com/85828652/150644821-2a86a82c-7ded-4873-a431-4f5c732420e3.jpg",
  "https://user-images.githubusercontent.com/85828652/150644833-a6e7ba84-ab76-46af-ae1f-964d0fe54f92.jpg",
  "https://user-images.githubusercontent.com/85828652/150644836-54b43486-f1f9-41ed-9da0-7f5ae6ec735f.jpg",
  "https://user-images.githubusercontent.com/85828652/150644838-5b5459a9-8d97-404a-9041-58de7cf261ef.jpg",
  "https://user-images.githubusercontent.com/85828652/150644841-c4b116f1-ff7b-4ca0-8f57-96e68a8916ef.jpg",
  "https://user-images.githubusercontent.com/85828652/150644846-3993dff2-6dcb-4076-ab77-ba4af2d73bbf.jpg",
  "https://user-images.githubusercontent.com/85828652/150644877-de30d6b0-7048-4ca7-9b9c-23810518aeb2.jpg",
  "https://user-images.githubusercontent.com/85828652/150644884-750d173c-ad4b-4634-8142-c76b3cd05d37.jpg",
  "https://user-images.githubusercontent.com/85828652/150644887-7f26d6f3-d809-4e94-a13d-b75668ac02c5.jpg",
  "https://user-images.githubusercontent.com/85828652/150644894-267ead30-971a-4d4a-bf0c-a4896fb60228.jpg",
  "https://user-images.githubusercontent.com/85828652/150644899-661dc6de-c097-4da5-8985-c75dc5de3899.jpg",
  "https://user-images.githubusercontent.com/85828652/150644905-236bbfe7-3ce9-4be6-b627-6c0e5fb27eea.jpg",
  "https://user-images.githubusercontent.com/85828652/150644909-0bea92cf-5c2a-4079-aaa5-7196233ae080.jpg",
  "https://user-images.githubusercontent.com/85828652/150644912-8b4aa491-2717-4fba-8cd0-1dd2541215cb.jpg",
  "https://user-images.githubusercontent.com/85828652/150644916-f2ed9b63-df2a-4806-a2bb-e8dd1ce41f5f.jpg",
  "https://user-images.githubusercontent.com/85828652/150644920-bbf3e721-0a27-46e1-a8b6-1efc46a4fd99.jpg",
  "https://user-images.githubusercontent.com/85828652/150644926-9d437d5e-006a-41d5-a18b-4b2f80f5f30b.jpg",
  "https://user-images.githubusercontent.com/85828652/150644934-c79f70b0-eed5-420a-8d97-3216c91713b2.jpg",
  "https://user-images.githubusercontent.com/85828652/150644936-c01a6172-1e2d-4807-9deb-1297716e7889.jpg",
  "https://user-images.githubusercontent.com/85828652/150644938-63eeb72f-baab-41a7-bdb1-beb11c72699b.jpg",
  "https://user-images.githubusercontent.com/85828652/150644945-ffe0f5b3-9bcc-407a-8a32-8fa73ef58374.jpg",
  "https://user-images.githubusercontent.com/85828652/150644949-99b68630-e153-42fc-96ff-3e0eb0c7dfa3.jpg",
  "https://user-images.githubusercontent.com/85828652/150644951-35c102e4-45e5-44d1-88c5-5ab4611b925b.jpg",
  "https://user-images.githubusercontent.com/85828652/150644955-08a21fc7-3e43-45f8-9ca2-df8c27145be9.jpg",
  "https://user-images.githubusercontent.com/85828652/150644959-734c73f0-f5d0-41e7-bd72-dd76e8d950a3.jpg",
  "https://user-images.githubusercontent.com/85828652/150644962-acde8b40-226a-4c5f-97b6-73fb7c825093.jpg",
  "https://user-images.githubusercontent.com/85828652/150644964-581b8d82-3581-4829-ab0a-9126fd3dbcc6.jpg",
  "https://user-images.githubusercontent.com/85828652/150644968-41ac4092-3168-4522-871d-70e4ea8448bc.jpg",
  "https://user-images.githubusercontent.com/85828652/150644971-3df4d31a-fc33-40aa-beb9-108b92d6f3c8.jpg",
  "https://user-images.githubusercontent.com/85828652/150644978-40b00cd6-2d42-423d-a09d-eab43c2f293f.jpg",
  "https://user-images.githubusercontent.com/85828652/150644981-0eb032ec-459e-41e4-87cc-c0c8a17d206f.jpg",
  "https://user-images.githubusercontent.com/85828652/150644983-31dbc4ce-9fb5-42e7-b2b1-f9671ace2469.jpg",
  "https://user-images.githubusercontent.com/85828652/150644990-02ee8bf4-db8f-4fe9-9c71-919998259948.jpg",
  "https://user-images.githubusercontent.com/85828652/150644995-e4cc1140-0a77-4c00-a413-45108760c7c2.jpg",
  "https://user-images.githubusercontent.com/85828652/150644999-91dbd46d-f512-435f-a859-b77d319530cd.jpg",
  "https://user-images.githubusercontent.com/85828652/150645001-6383be09-be12-4580-9d5f-b0984efdd3fd.jpg",
  "https://user-images.githubusercontent.com/85828652/150645010-27aaff48-1f47-4c1a-bc11-a7481acff26d.jpg",
  "https://user-images.githubusercontent.com/85828652/150645013-841b2686-7ea4-49aa-8a24-a39cdfa475ef.jpg",
  "https://user-images.githubusercontent.com/85828652/150645019-62d21316-dea7-4b64-8b10-afd0c01ba4b3.jpg",
  "https://user-images.githubusercontent.com/85828652/150645022-22c5cc25-fbdc-40e5-8ded-8aa7452075b3.jpg",
  "https://user-images.githubusercontent.com/85828652/150645025-3fffecf5-9675-4dd0-a783-e5c3937df0ee.jpg",
  "https://user-images.githubusercontent.com/85828652/150645030-a9c9f3e7-349f-4a63-8861-0c52de769735.jpg",
  "https://user-images.githubusercontent.com/85828652/150645039-84fd7605-afa7-4fda-96ed-5e0bc16b83df.jpg",
  "https://user-images.githubusercontent.com/85828652/150645041-2453fc0c-878c-4e8f-8a46-9954fc4323c4.jpg",
  "https://user-images.githubusercontent.com/85828652/150645043-36635a58-26b8-4954-83b0-dd054a9e1855.jpg",
  "https://user-images.githubusercontent.com/85828652/150645046-d3e87f4c-958a-4123-a4b2-c7c7f9782a4b.jpg",
  "https://user-images.githubusercontent.com/85828652/150645051-24e4987f-4b8a-4385-a6ca-a34cad897547.jpg",
  "https://user-images.githubusercontent.com/85828652/150645056-731c9da9-8b51-4640-97ed-981b47484f93.jpg",
  "https://user-images.githubusercontent.com/85828652/150645069-499c18fd-74df-4472-ac16-fa7140be307e.jpg",
  "https://user-images.githubusercontent.com/85828652/150645073-df1969a4-3ea1-4780-bc6a-ffcf353b841d.jpg"

];

const ImageViewer = ({ selectedPaper, lightOn, microscopePosition, setMicroscopePosition}) => {
  // Determine which array to use based on light and paper selection
  const imageArray = !lightOn ? images3 : selectedPaper === 'A' ? images2 : images1;

  // Calculate index based on microscope position (slider value)
  const imageIndex = Math.floor((microscopePosition / 100) * (imageArray.length - 1));

  return (
    <div className="fixed">
      <img
        src={imageArray[imageIndex]}
        alt={`Experiment Image ${imageIndex + 1}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
        <h5>Microscope Position</h5>
        <input
          type="range"
          min="0"
          max="100"
          value={microscopePosition}
          onChange={(e) => setMicroscopePosition(e.target.value)}
          style={{ marginLeft: '10px', flex: 1 }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
        <h4 style={{ marginRight: '20px', color: 'black' }}>
          Meet The Team
        </h4>

        <button
          onClick={() => {
            window.location.href = '/about'; // Redirects to the About page
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          About Us
        </button>
      </div>
      <div className='grid grid-cols-3 gap-5'>

        {/* <button
          onClick={() => {
            window.location.href = '/about'; // Redirects to the About page
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Pretest
        </button>
        <button
          onClick={() => {
            window.location.href = '/about'; // Redirects to the About page
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Posttest
        </button> */}
        <button
          onClick={() => {
            window.open('https://forms.gle/NMKT4WM2iqsp2UEPA', '_blank'); // Redirects to the About page
          }}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
          }}
        >
          Feedback
        </button>
      </div>
    </div>

  );
};

export default ImageViewer;
