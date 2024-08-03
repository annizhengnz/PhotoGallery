## How to use postgresql

start docker 
start dicker compose for db
`docker start compose-postgres`

run psql with docker container id 
`docker exec -it 8dbb358d55e1bf82cd626d41b26216f15989e05b51e5e8753618b26c57404907 psql -U postgres`

create database

change `appsettings.json`

```csharp
    "PostgreDB": "Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=photogallery"

```

change `Program.cs` file 
```csharp
var Configuration = builder.Configuration;
builder.Services.AddDbContext<StudentContext>(options =>
        options.UseNpgsql(Configuration.GetConnectionString("PostgreDB") ?? throw new InvalidOperationException("Connection string 'PostgreDB' not found.")));

```
Run 

`dotnet ef migrations add InitialCreate`

`dotnet ef database update`


----
**Reference**

https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli#install-the-tools \
https://medium.com/@saisiva249/how-to-configure-postgres-database-for-a-net-a2ee38f29372