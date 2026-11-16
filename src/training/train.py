import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression



FILEPATH = "/home/fidisroxy/development/house-app/house-pred-app/ml/data/processed/uk_housing_data.csv"


df = pd.read_csv(FILEPATH)

target = "saleEstimate_currentPrice"
features_to_drop = ['rentEstimate_upperPrice','rentEstimate_lowerPrice',
            'rentEstimate_currentPrice', 'saleEstimate_upperPrice','saleEstimate_lowerPrice']
X = df.drop(
    columns=features_to_drop,
    errors= "ignore"
)

y = df[target]

# split the dataset into train and test splits
X_train, X_test, y_test = train_test_split(
    
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


preprocessor = ColumnTransformer([
    ("numeric", numeric_pipeline, numeric_features),
    ("categorical", categorical_pipeline, categorical_features)
])