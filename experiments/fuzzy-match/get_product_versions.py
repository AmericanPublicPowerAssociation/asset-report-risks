from argparse import ArgumentParser


if __name__ == '__main__':
    p = ArgumentParser()
    # !!! If product version is blank, return all versions for product
    # ranked by most frequently used
    for product_version in matched_product_versions:
        print(product_version)
