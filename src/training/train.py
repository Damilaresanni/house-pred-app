import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import(
    mean_absolute_error,
    mean_squared_error,
    r2_score
)



FILEPATH = "/home/fidisroxy/development/house-app/house-pred-app/ml/data/processed/uk_housing_data.csv"


file = pd.read_csv(FILEPATH)

df = file.copy()
target = "saleEstimate_currentPrice"
df = df.dropna(subset=[target])
features_to_drop = ['rentEstimate_upperPrice','rentEstimate_lowerPrice',
            'rentEstimate_currentPrice', 'saleEstimate_upperPrice','saleEstimate_lowerPrice']
X = df.drop(
    columns=features_to_drop,
    errors= "ignore"
)

y = df[target]


# split the dataset into train and test splits
X_train, X_test,y_train, y_test = train_test_split(
    
    X, y, test_size=0.3,
    random_state=42
)

numeric_features = X.select_dtypes(
    include = "number"
).columns.tolist()

categorical_features = X.select_dtypes(
    include = ["object", "category", "string"]
).columns.tolist()


numeric_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])


categorical_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore"))
])


preprocessing = ColumnTransformer([
    ("numeric", numeric_pipeline, numeric_features),
    ("categorical", categorical_pipeline, categorical_features)
])


# train the linear regression model

model = Pipeline([
    ('preprocessor', preprocessing),
    ('regressor', LinearRegression())
])

model.fit(X_train, y_train)


y_pred = model.predict(X_test)

results = pd.DataFrame({
    "Actual_price":y_test.to_numpy(),
    "predicted_price": y_pred
})
print(results)

print("***************************")
print("***************************")
print("***************************")
print("\n")

mae = mean_absolute_error(y_test,y_pred)

rmse = np.sqrt(
    mean_squared_error(y_test,y_pred)
)

r2 = r2_score(y_test, y_pred)


print(f"MAE: {mae:,.2f}")
print(f"RMSE: {rmse:,.2f}")
print(f"R_2_SCORE: {r2: ,.2f}")


