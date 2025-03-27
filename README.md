# VocalVichar - Microservices-Based Audio Content Management System

VocalVichar is a **scalable microservices-driven backend** designed for efficient **audio content management**. The system is structured into three independent services:

## 🔹 Microservices Architecture
| Service  | Description  | Repository Link  |
|----------|-------------|------------------|
| **Song Service** | Manages song uploads, metadata, and storage. | [VocalVichar-SongService](https://github.com/Mohitgit22/VocalVichar-SongService) |
| **Admin Service** | Handles user & content moderation, analytics, and system configurations. | [VocalVichar-AdminService](https://github.com/Mohitgit22/VocalVichar-AdminService) |
| **User Service** | Manages user authentication, profiles, and interactions. | [VocalVichar-UserService](https://github.com/Mohitgit22/VocalVichar-UserService) |

## 🔹 Technologies Used
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Redis  
- **Authentication:** JWT, bcrypt  
- **Deployment:** AWS EC2  

## 🔹 Installation Guide
Each service must be **cloned separately** and run independently. Refer to their individual `README.md` files for setup instructions.

```bash
# Clone the required service
git clone https://github.com/Mohitgit22/VocalVichar-<ServiceName>.git
