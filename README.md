# NFT Marketplace 
1. Create a .env file in your root folder. It should contain the variables API_URL_KEY and PRIVATE_KEY. The API_URL_KEY is the API URL that you would get from setting up a Goerli node using Quicknode. The private key is your MetaMask private key. Your hardhat.config.js file will refer to these two variables in the file. 
2. Use the deploy.js script to deploy the Collection.sol contract. Then get the contract address. This contract address will need to be pasted inside App.js. Alternatively, you can skip these 2 steps and use the contract that has been deployed. 
3. collections-react folder is the React folder generated from the React boilerplate. 
4. It contains public/assets which has two subfolders - images and metadata. These five images will appear on your frontend. 
5. Before that, you will need to upload the images onto Pinata and get their sharable link. 
6. Then in the metadata folder, click on each of the files. There is an image key where the value is this sharable link of the image. 
7. Then upload this metadata file onto Pinata as well and get their sharable link. You will need to fill it in the param key for the data object in App.js (lines 47 to 64). 

This NFT marketplace was created using the tutorial by Metaschool.
![image](https://user-images.githubusercontent.com/12713419/222471737-5cdf8d00-aab4-4e82-9c38-04c955b6fd7f.png)
