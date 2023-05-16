- Table of Contents
  - [Introduction](#introduction)
  - [Test Cases](#test-cases)
    - [My Account](#My-Account)
      - [My Collection](#My-Collection)
      - [My NFT](#My-NFT)
      - [My Collection](#My-Stakes)
      - [My Profile](#My-Profile)
    - [Marketplace](#marketplace)
      - [Add new collection in simple mode](#Add-new-collection-in-simple-mode)
      - [Edit a collection](#Edit-a-collection)
      - [Add new collection in advanced mode](#Add-new-collection-in-advanced-mode)
      - [Add a new NFT](#Add-a-new-NFT)
      - [Edit an NFT](#Edit-an-NFT)
      - [List an NFT](#List-an-NFT)
      - [Cancel listing an NFT](#Cancel-listing-an-NFT)
      - [Buy an NFT](#Buy-an-NFT)
      - [Make an offer](#Make-an-offer)
      - [Remove an offer](#Remove-an-offer)
      - [Accept an offer](#Accept-an-offer)
      - [Transfer an NFT](#Transfer-an-NFT)
      - [Claim unsuccessful bids](#Claim-unsuccessful-bids)
      - [Lock Metadata of an NFT](#Lock-metadata-of-an-NFT)
      - [Stake a PMP NFT](#Stake-a-PMP_NFT)
      - [Multi-stake PMP NFTs](#Multi-stake-PMP_NFTs)
      - [Unstake a PMP NFT](#Unstake-a-PMP_NFT)
      - [Cancel unstake of a PMP NFT](#Cancel-unstake-of-a-PMP-NFT)
      - [Multi-Unstake PMP NFTs](#Multi-Unstake-PMP_NFTs)
      - [Multi-cancel unstake of PMP NFTs](#Multi-cancel-unstake-of-PMP-NFTs)
      - [Claim earnings from staking](#Claim-earnings-from-staking)
    - [LaunchPad](#launchpad)
      - [Create a project](#Create-a-project)
      - [Update art location](#Update-art-location)
      - [Grant admin role](#Grant-admin-role)
      - [Update project info](#Update-project-info)
      - [Update project phases](#Update-project-phases)
      - [Add a whitelist](#Add-a-whitelist)
      - [Owner mint](#Owner-mint)
      - [Withdraw balance](#Withdraw-balance)
      - [Mint an NFT](#Mint-an-NFT)
    - [Admin](#Admin)
      - [Set doxxed badge](#Set-doxxed-badge)
      - [Remove doxxed badge](#Remove-doxxed-badge)
      - [Set verified badge](#Set-verified-badge)
      - [Remove verified badge](#Remove-verified-badge)
      - [Enable a collection](#Enable-a-collection)
      - [Disable a collection](#Disable-a-collection)
      - [Grant admin to mange the platform](#Grant-admin-to-mange-the-platform)
      - [Check advanced mode collection](#Check-advanced-mode-collection)
      - [Enable a project](#Enable-a-project)
      - [Disable a project](#Disable-a-project)
      - [Lock staking](#Lock-staking)
      - [Add rewards](#Add-rewards)
      - [Start reward distribution](#Start-reward-distribution)
      - [Stop reward distribution](#Stop-reward-distribution)
      - [Unlock staking](#Unlock-staking)
      - [Claim balance](#Claim-balance)

## Introduction
```
This test plan aims to define a structured approach to ensure the quality of the front-end functionality of an NFT Marketplace project. The plan includes testing the core features of the marketplace, including browsing and purchasing NFTs, creating and managing collections, staking NFTs, and participating in NFT auctions.

The objective of this test plan is to identify any functional and usability issues in the front-end of the marketplace, ensuring that users have a seamless experience while using the platform.

The test plan includes a comprehensive set of test cases that cover various scenarios and test conditions. It also outlines the pre-requisites required for executing the test cases, test steps to perform, and the expected outcomes.

The primary audience for this test plan includes the quality assurance team, developers, project managers, and stakeholders involved in the development of the NFT marketplace. The test plan will guide the testing activities and help to ensure that the front-end functionality of the marketplace meets the defined requirements and user expectations.

```

## Test Cases
### My Account
```
Test case ID: my_account_001
Test case Name: Verify Dashboard Page Information Display
Pre-requisite: User must be logged in and have access to the Dashboard page.
Expectations:
  -	The user's address should be displayed on the Dashboard page.
  -	The number of NFTs for sale should be displayed on the Dashboard page.
  -	The number of Staked NFTs should be displayed on the Dashboard page.
  -	The number of Pending Staked NFTs should be displayed on the Dashboard page.
  -	The total number of owned NFTs should be displayed on the Dashboard page.
  -	The recent reward history should be displayed on the Dashboard page.
  -	The Info staking NFT should be displayed on the Dashboard page.

Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the Dashboard page.
  3.	Verify that the user's address is displayed on the page.
  4.	Verify that the number of NFTs for sale is displayed on the page.
  5.	Verify that the number of Staked NFTs is displayed on the page.
  6.	Verify that the number of Pending Staked NFTs is displayed on the page.
  7.	Verify that the total number of owned NFTs is displayed on the page.
  8.	Verify that the recent reward history is displayed on the page.
  9.	Verify that the Info staking NFT is displayed on the page.

```

```Test case ID: my_account_002
Test case Name: Verify Functionality of Trade Discount Modal for PMP NFT Staked
Pre-requisite: User must be logged in and have access to the Dashboard page.
Expectations:
  -	The user should be able to access the Trade Discount Modal on the Dashboard page.
  -	The modal should display a table with three columns: Stakers, Trade Fee, and Trade Discount by Percent.
  -	The user should be able to view the stakers who are eligible for the trade discount.
  -	The user should be able to view the trade fee and trade discount for each stake NFT quantity.

Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the Dashboard page.
  3.	Locate and access the Trade Discount Modal.
  4.	Verify that the modal displays a table with the columns Stakers, Trade Fee, and Trade Discount by Percent.
  5.	Verify that the table displays the stakers who are eligible for the trade discount.
  6.	Verify that the table displays the trade fee and trade discount for each stake NFT quantity.
```
### My Collection

```
Test case ID: collection_001
Test case Name: Verify Functionality of My Collection Page
Pre-requisite: User must be logged in and have created collections.
Expectations:
-	The user should be able to access the My Collection page.
-	The page should display all collections created by the user.
-	The collections should be displayed with pagination.
-	The page should have a Create Collection button.
-	Each collection should display information including an avatar, volume, royalty percent, and image.

Test Steps:
1.	Login to the NFT marketplace as a registered user.
2.	Navigate to the My Collection page.
3.	Verify that all collections created by the user are displayed on the page.
4.	Verify that the collections are displayed with pagination.
5.	Verify that the page has a Create Collection button.
6.	Select a collection and verify that it displays the collection's information including an avatar, volume, royalty percent, and image.

```
```
Test case ID: collection_002
Test case Name: Verify Pagination Functionality on My Collection Page
Pre-requisite: User must be logged in and have created collections.
Expectations:
  -	The user should be able to access the My Collection page.
  -	The page should display all collections created by the user.
  -	The collections should be displayed with pagination.
  -	The user should be able to navigate to other pages using the pagination buttons.

Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My Collection page.
  3.	Verify that all collections created by the user are displayed on the page.
  4.	Verify that the collections are displayed with pagination.
  5.	Select the pagination button to navigate to the next page.
  6.	Verify that the next set of collections is displayed on the page.

```
```
Test case ID: collection_003
Test case Name: Verify Functionality of Collection Royalty on My Collection Page
Pre-requisite: User must be logged in and have created collections.
Expectations:
-	The user should be able to access the My Collection page.
-	Each collection should display a royalty percent.
-	The user should be able to edit the royalty percent for the collection.

Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My Collection page.
  3.	Select a collection from the list.
  4.	Verify that the collection displays a royalty percent.
  5.	Select the Edit button for the collection.
  6.	Edit the royalty percent for the collection and save the changes.
  7.	Verify that the new royalty percent is displayed for the collection.

```
### My NFT
```
Test case ID: mynft_001
Test case Name: Verify Functionality of My NFTs Page with All NFTs
Pre-requisite: User must be logged in and have at least one NFT in their collection.
Expectations:
  -	The user should be able to access the My NFTs page.
  -	All NFTs in the user's collection should be displayed.
  -	The user should be able to view detailed information for each NFT.

Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My NFTs page.
  3.	Verify that all NFTs in the user's collection are displayed.
  4.	Select an NFT from the list.
  5.	Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
```
```
Test case ID: mynft_002
Test case Name: Verify Functionality of My Collected Tab on My NFTs Page
Pre-requisite: User must be logged in and have at least one NFT in their collection.
Expectations:
  -	The user should be able to access the My NFTs page.
  -	All NFTs in the user's collection should be displayed.
  -	The My Collected tab should display only the NFTs the user has collected.
  -	The user should be able to view detailed information for each NFT.
Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My NFTs page.
  3.	Select the My Collected tab.
  4.	Verify that only the NFTs the user has collected are displayed.
  5.	Select an NFT from the list.
  6.	Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
```

```
Test case ID: mynft_003
Test case Name: Verify Functionality of My Listing Tab on My NFTs Page
Pre-requisite: User must be logged in and have at least one NFT listed for sale.
Expectations:
  -	The user should be able to access the My NFTs page.
  -	The My Listing tab should display only the NFTs the user has listed for sale.
  -	The user should be able to view detailed information for each NFT.
  -	The user should be able to edit or cancel their listings.
Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My NFTs page.
  3.	Select the My Listing tab.
  4.	Verify that only the NFTs the user has listed for sale are displayed.
  5.	Select an NFT from the list.
  6.	Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
  7.	Select the Edit or Cancel button for the listing.
  8.	Verify that the user is able to edit or cancel the listing.
```
### My Stakes
```
Test case ID: mystake_001
Test case Name: Verify Functionality of My Stake NFT Page with All Staker NFTs
Pre-requisite: User must be logged in and have at least one staked NFT.
Expectations:
  •	The user should be able to access the My Stake NFT page.
  •	All staker NFT collections should be displayed.
  •	The user should be able to view detailed information for each staker NFT.
  •	PMP NFT stats should be displayed for the user.
Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My Stake NFT page.
  3.	Verify that all staker NFT collections are displayed.
  4.	Select a staker NFT from the list.
  5.	Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
  6.	Verify that PMP NFT stats are displayed for the user.
```
```
Test case ID: mystake_002
Test case Name: Verify Functionality of NOT Staked Tab on My Stake NFT Page
Pre-requisite: User must be logged in and have at least one NFT collection with staking available but not staked.
Expectations:
  -	The user should be able to access the My Stake NFT page.
  -	The NOT Staked tab should display only the NFT collections the user has not staked.
  -	The user should be able to view detailed information for each staker NFT.
Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My Stake NFT page.
  3.	Select the NOT Staked tab.
  4.	Verify that only the NFT collections the user has not staked are displayed.
  5.	Select a staker NFT from the list.
  6.	Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation, and any other relevant information.
```
```
Test case ID: mystake_003
Test case Name: Verify Functionality of Pending Unstake Tab on My Stake NFT Page
Pre-requisite: User must be logged in and have at least one staked NFT with a pending unstake.
Expectations:
  -	The user should be able to access the My Stake NFT page.
  -	The Pending Unstake tab should display only the NFT collections the user has staked with a pending unstake.
  -	The user should be able to view detailed information for each staker NFT.
Test Steps:
  1.	Login to the NFT marketplace as a registered user.
  2.	Navigate to the My Stake NFT page.
  3.	Select the Pending Unstake tab.
  4.	Verify that only the NFT collections the user has staked with a pending unstake are displayed.
  5.	Select a staker NFT from the list.
  6.	Verify that detailed information is displayed for the NFT, including the collection it belongs to, the owner, the creator, the date of creation
```
```
Test case ID: mystake_004
Test case Name: Verify refresh data button

Pre-requisite: User is logged in and has staked and unstaked PMP NFTs.

Expectations:
  -	Click on the "Refresh Data" button and verify that the staking details and PMP NFT stats are updated correctly.
  -	Verify that the total number of staked and unstaked PMP NFTs displayed in the corresponding tabs are updated correctly after clicking the "Refresh Data" button.
```
### My Projects
```
Test case ID: myproject_001
Test case Name: Verify display of all created launchpad projects

Pre-requisite: User is logged in and has created at least one launchpad project.

Test steps:
  1.	Navigate to the "My Project" page.
  2.	Verify that all created launchpad projects are displayed correctly, with the project name, logo, status, and creation date.
  3.	Verify that each project has a "Mint NFT" and "Whitelist Address" button.
Expectations:
  All created launchpad projects are displayed correctly on the "My Project" page.
  Each project has a "Mint NFT" and "Whitelist Address" button.
```
```
Test case ID: myproject_002
Test case Name: Verify "Mint NFT" button functionality

Pre-requisite: User has created a launchpad project and has NFTs to mint.

Test steps:
  1.	Navigate to the "My Project" page.
  2.	Click on the "Mint NFT" button for a project.
  3.	Fill in the required fields in the minting form.
  4.	Submit the form.
  5.	Verify that the new NFT is created successfully and is visible in the user's wallet.
Expectations:
  -	The minting form is displayed after clicking on the "Mint NFT" button.
  -	The required fields in the minting form are filled correctly.
  -	The new NFT is created successfully and is visible in the user's wallet.
```
```
Test case ID: myproject_003
Test case Name: Verify "Whitelist Address" button functionality

Pre-requisite: User has created a launchpad project and has a list of addresses to whitelist.

Test steps:
  1.	Navigate to the "My Project" page.
  2.	Click on the "Whitelist Address" button for a project.
  3.	Add the required addresses to the whitelist.
  4.	Submit the form.
  5.	Verify that the addresses are added to the whitelist successfully and are able to participate in the project's launchpad.
Expectations:
  -	The whitelist form is displayed after clicking on the "Whitelist Address" button.
  -	The required addresses are added to the whitelist correctly.
  -	The addresses are added to the whitelist successfully and are able to participate in the project's launchpad.
```

### My Profile
```
Test case ID: myprofile_001
Test case Name: Update user profile information
Pre-requisite: User is logged in and on the update profile modal

Test Steps:
  1.	Click on the 'Update Profile' button on the profile page.
  2.	Verify that the modal window is displayed with the current user details.
  3.	Try to update the profile image by selecting an invalid file format.
  4.	Verify that the 'Invalid File Format' error message is displayed.
  5.	Try to update the 'User Name' field with an invalid input (e.g. special characters).
  6.	Verify that the 'User Name' field is not updated and an error message is displayed.
  7.	Try to update the 'Bio' field with an invalid input (e.g. too long).
  8.	Verify that the 'Bio' field is not updated and an error message is displayed.
  9.	Try to update the 'Twitter URL' field with an invalid URL.
  10.	Verify that the 'Twitter URL' field is not updated and an error message is displayed.
  11.	Try to update the 'Facebook URL' field with an invalid URL.
  12.	Verify that the 'Facebook URL' field is not updated and an error message is displayed.
  13.	Try to update the 'Telegram URL' field with an invalid URL.
  14.	Verify that the 'Telegram URL' field is not updated and an error message is displayed.
  15.	Try to update the 'Instagram URL' field with an invalid URL.
  16.	Verify that the 'Instagram URL' field is not updated and an error message is displayed.
  17.	Click on the 'Save Changes' button.
  18.	Verify that the modal remains open and no changes are saved.

Expectations:
-	The user should be able to update the profile image with a new image file.
-	The user should be able to update the 'User Name' field with a new valid name.
-	The user should be able to update the 'Bio' field with a new valid description.
-	The user should be able to update the 'Twitter URL' field with a valid URL.
-	The user should be able to update the 'Facebook URL' field with a valid URL.
-	The user should be able to update the 'Telegram URL' field with a valid URL.
-	The user should be able to update the 'Instagram URL' field with a valid URL.
-	The updated user profile information should be displayed on the profile page after saving the changes.
```
```
Test case ID: myprofile_002
Test case Name: Update user profile with invalid input
Pre-requisite: User is logged in and on the update profile modal

Test Steps:
  1.	Click on the 'Update Profile' button on the profile page.
  2.	Verify that the modal window is displayed with the current user details.
  3.	Try to update the profile image by selecting an invalid file format.
  4.	Verify that the 'Invalid File Format' error message is displayed.
  5.	Try to update the 'User Name' field with an invalid input (e.g. special characters).
  6.	Verify that the 'User Name' field is not updated and an error message is displayed.
  7.	Try to update the 'Bio' field with an invalid input (e.g. too long).
  8.	Verify that the 'Bio' field is not updated and an error message is displayed.
  9.	Try to update the 'Twitter URL' field with an invalid URL.
  10.	Verify that the 'Twitter URL' field is not updated and an error message is displayed.
  11.	Try to update the 'Facebook URL' field with an invalid URL.
  12.	Verify that the 'Facebook URL' field is not updated and an error message is displayed.
  13.	Try to update the 'Telegram URL' field with an invalid URL.
  14.	Verify that the 'Telegram URL' field is not updated and an error message is displayed.
  15.	Try to update the 'Instagram URL' field with an invalid URL.
  16.	Verify that the 'Instagram URL' field is not updated and an error message is displayed.
  17.	Click on the 'Save Changes' button.
  18.	Verify that the modal remains open and no changes are saved.
Expectations:
  •	The user should not be able to update the profile image with an invalid file format.
  •	The user should not be able to update the 'User Name' field with an invalid input.
  •	The user should not be able to update the 'Bio' field with an invalid input.
  •	The user should not be able to update the 'Twitter URL' field with an invalid URL.
  •	The user should not be able to update the 'Facebook URL' field with an invalid URL.
  •	The user should not be able to update the 'Telegram URL' field with an invalid URL.
  •	The user should not be able to update the 'Instagram URL' field with an invalid URL.
  •	The modal should remain open and no changes should be saved if any input is invalid.
```
```
Test case ID: myprofile_003
Test case Name: View user profile
Pre-requisite: User is logged in and on the profile page

Test Steps:
  1.	Verify that the user's profile image is displayed on the page.
  2.	Verify that the user's User Name is displayed on the page.
  3.	Verify that the user's Bio is displayed on the page.
  4.	Verify that the 'About' section is displayed on the page.
  5.	Verify that the 'Twitter URL' button is displayed and clickable.
  6.	Verify that the 'Facebook URL' button is displayed and clickable.
  7.	Verify that the 'Telegram URL' button is displayed and clickable.
  8.	Verify that the 'Instagram URL' button is displayed and clickable.
Expectations:
  -	The user's profile image should be displayed on the page.
  -	The user's User Name should be displayed on the page.
  -	The user's Bio should be displayed on the page.
  -	The 'About' section should be displayed on the page.
  -	The 'Twitter URL' button should be displayed and clickable.
  -	The 'Facebook URL' button should be displayed and clickable.
  -	The 'Telegram URL' button should be displayed and clickable.
  -	The 'Instagram URL' button should be displayed and clickable.
```
```
Test case ID: myprofile_004
Test case Name: Click 'Twitter URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:
  1.	Click on the 'Twitter URL' button.
  2.	Verify that the Twitter URL is opened in a new tab.
Expectations:
  The Twitter URL should be opened in a new tab.
```
```
Test case ID: myprofile_005
Test case Name: Click 'Facebook URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:
  1.	Click on the 'Facebook URL' button.
  2.	Verify that the Facebook URL is opened in a new tab.
Expectations:
  The Facebook URL should be opened in a new tab.
```
```
Test case ID: myprofile_006
Test case Name: Click 'Telegram URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:
  1.	Click on the 'Telegram URL' button.
  2.	Verify that the Telegram URL is opened in a new tab.
Expectations:
  The Telegram URL should be opened in a new tab.
```
```
Test case ID: myprofile_007
Test case Name: Click 'Instagram URL' button
Pre-requisite: User is logged in and on the profile page

Test Steps:
  1.	Click on the 'Instagram URL' button.
  2.	Verify that the Instagram URL is opened in a new tab.
Expectations:
  The Instagram URL should be opened in a new tab.
```
