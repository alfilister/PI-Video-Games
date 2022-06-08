## Videogames App - Single Page Application

It is an application that has a video game database that receives some (first 100 from more than 700 thousand videogames listed in Rawg) data both from an API and from its own database (created using PostgreSQL and managed through Sequelize).

The page has a Landing Page with an animation that gives time for the information to load by the API response, once inside you can sort by rating or name, in addition to filtering by category, origin (Database / API) .
Likewise, you can search for a specific name or even go through a certain page to better organize the number of video games displayed. 

Video games can also be created, this through a controlled form that informs the user about the creation requirements and in the same way prevents creation requests from being made with incorrect or empty data, which will be stored in its own database, to which the same filters and sorts will also be applied to them.

Landing Page.
![Screenshot from 2022-06-08 15-46-53](https://user-images.githubusercontent.com/89329462/172722867-c7868788-abba-4d32-9cf2-efb26a9b6b81.png)

Here is the home, where you can see the general widescreen to interact with the web.
![Screenshot from 2022-06-08 15-46-40](https://user-images.githubusercontent.com/89329462/172722864-1af76def-f271-4668-b183-50ab43f65b30.png)

By clicking into the button, you land here on the createPage, the control form is waitting for your informacion!
![Screenshot from 2022-06-08 15-48-30](https://user-images.githubusercontent.com/89329462/172722878-768944f5-18bd-4c48-b977-0ab3e0bacb14.png)

Only by filling all the information required the Create button is gonna be available, so follow the indications very carfully.
![Screenshot from 2022-06-08 15-50-07](https://user-images.githubusercontent.com/89329462/172722881-5a7c93ac-0e0c-44d6-bd9a-1396e6fbf94c.png)

Here we have the TestGame created by us, to enter into the detail page jus need to click on the card images. Please note that this TestGame has a delete button, it is only visible on videogames created by the guest.
![Screenshot from 2022-06-08 15-50-36](https://user-images.githubusercontent.com/89329462/172722886-37394e53-d72c-4797-9fca-eac34edc50db.png)

Here is the detail page from a videogame obtained from the API (Rawg), as you can see those games have more information but miss the delete button.
![Screenshot from 2022-06-08 15-50-51](https://user-images.githubusercontent.com/89329462/172722888-b06839cf-1e82-4e4c-98fe-abc3d4b9ac2e.png)


SearchBar result when input is test (to locate our recent created videoGame)
![Screenshot from 2022-06-08 15-52-09](https://user-images.githubusercontent.com/89329462/172722889-9bb9fe26-adeb-46ed-b758-92b417d64e1c.png)

And to show that searchBar work with multiple results I type skyrim to show as many videogames have a coincidence in the name with the input.
![Screenshot from 2022-06-08 15-52-56](https://user-images.githubusercontent.com/89329462/172722890-e342689e-f45e-4dd3-b795-24ee8d98d0d6.png)

